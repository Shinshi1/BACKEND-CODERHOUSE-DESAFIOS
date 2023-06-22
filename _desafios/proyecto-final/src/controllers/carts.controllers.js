const { cartsService, productsService, ticketService, usersService } = require('../repositories/index.js');

const getCarts = async (req, res) => {
  try {
    const result = await cartsService.getCarts()
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message)
    req.logger.error(`Error getting carts: ${error.message}`)
  }
}

const saveCart = async (req, res) => {
  try {
    const response = await cartsService.createCart();
    res.status(200).send({ message: 'carrito creado', response })
  } catch (error) {
    res.status(500).send(error.message)
    req.logger.error(`Error creating the cart: ${error.message}`)
  }
}

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await cartsService.deleteCart(id);

    if (Boolean(response) === true) {
      res.status(200).send({ message: 'Carrito eliminado', response });
    } else {
      res.status(404).send({ message: 'Carrito no encontrado', response });
    }
  } catch (error) {
    req.logger.error(`Error deleting cart: ${error.message}`)
    res.status(500).send(error.message)
  }
}

const addOneProductToCart = async (req, res) => {
  const { cid } = req.params;
  const product = req.body;
  const user = req.session.user;

  try {
    const productFound = await productsService.findProductById(product._id)

    if (!user || !productFound) {
      return res.status(404).send({ error: 'Usuario o producto no encontrado' })
    }
    // console.log('tiene que dar true:', user.role === 'premium' && productFound.owner === user.email )
    if (user.role === 'premium' && productFound.owner === user.email) {
      return res.status(405).send({ error: 'No puedes agreagar tu propio producto al carrito' })
    }

    const response = await cartsService.addSingleProductToCart(cid, product);
    res.status(200).send({ message: 'Carrito actualizado!', response })
  } catch (error) {
    req.logger.error(`Error adding a product to cart: ${error.message}`)
    res.status(500).send(error.message);
  };
}

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params
  try {

    await cartsService.deleteProduct(cid, pid);

    res.status(200).send({ message: `product ${pid} deleted from cart ${cid}` })
  } catch (error) {
    req.logger.error(`Error deleting a product from the cart: ${error.message}`)
    res.status(500).send(error.message)
  }
}

const addProductsToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const user = req.session.user;

  try {
    const productFound = await productsService.findProductById(pid)

    if (!user || !productFound) {
      return res.status(404).send({ error: 'Usuario o producto no encontrado' })
    }

    if (user.role === 'premium' && productFound.owner === user.email) {
      return res.status(405).send({ error: 'No puedes agreagar tu propio producto al carrito' })
    }

    const response = await cartsService.updateProduct(cid, pid, quantity)
    if (response.modifiedCount === 0) {
      return res.status(404).send({ error: 'El producto no puso ser actualizdo ni agregado al carrito' })
    }

    res.status(200).send({ message: `quantity of product ${pid} in cart ${cid} increased by ${quantity}` })
  } catch (error) {
    req.logger.error(`Error adding products to cart: ${error.message}`)
    res.status(500).send(error.message)
  }
}

const deleteAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;

  try {
    await cartsService.deleteAllProducts(cid)
    res.status(200).send({ message: `all products deleted from cart ${cid}` })
  } catch (error) {
    req.logger.error(`Error deleting all products from the cart: ${error.message}`)
    res.status(500).send(error.message)
  }
}

const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const response = await cartsService.findCart(cid);
    res.status(200).send({ message: 'Cart found', response: response })
  } catch (error) {
    req.logger.error(`Error obtaining a cart by id: ${error.message}`)
    res.status(500).send(error.message)
  }
}

const finalizePurchase = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartsService.findCart(cid)

    const unavalibleProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      const productInStock = await productsService.findProductById(product._id);

      if (productInStock.stock >= quantity) {
        productInStock.stock -= quantity;
        await productInStock.save();

        totalAmount += product.price * quantity
        cartsService.deleteProduct(cid, product._id)
      } else {
        unavalibleProducts.push(product._id)
      }
    }

    // ticket
    await ticketService.createTicket(totalAmount, req.user.email)

    res.status(200).send({ message: 'Successful purchase', unavalibleProducts: unavalibleProducts });
  } catch (error) {
    req.logger.error(`Error at checkout: ${error.message}`)
    res.status(500).send(error.message)
  }
}

module.exports = {
  getCarts,
  saveCart,
  deleteCart,
  addOneProductToCart,
  deleteProductFromCart,
  addProductsToCart,
  deleteAllProductsFromCart,
  getCartById,
  finalizePurchase
}