const { cartsService, usersService } = require('../repositories/index.js');
const { productModel } = require('../dao/mongo/models/products.model.js')
const ticketModel = require('../dao/mongo/models/ticket.model.js');

const getCarts = async (req, res) => {
  try {
    const result = await cartsService.getCarts()
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const saveCart = async (req, res) => {
  try {
    const response = await cartsService.createCart();
    res.status(200).send({ message: 'carrito creado', response })
  } catch (error) {
    res.status(500).send(error.message)
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
    res.status(500).send(error.message)
  }
}

const addOneProductToCart = async (req, res) => {
  const { cid } = req.params;
  const product = req.body;
  try {
    const response = await cartsService.addSingleProductToCart(cid, product);
    res.status(200).send({ message: 'Carrito actualizado!', response })
  } catch (error) {
    res.status(500).send(error.message);
  };
}

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params
  try {

    await cartsService.deleteProduct(cid, pid);

    res.status(200).send({ message: `product ${pid} deleted from cart ${cid}` })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const addProductsToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await cartsService.updateProduct(cid, pid, quantity)
    res.status(200).send({ message: `quantity of product ${pid} in cart ${cid} increased by ${quantity}` })

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;

  try {
    await cartsService.deleteAllProducts(cid)
    res.status(200).send({ message: `all products deleted from cart ${cid}` })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const response = await cartsService.findCart(cid);
    res.status(200).send({ message: 'Cart found', response: response })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const finalizePurchase = async (req, res) => {
  const { cid } = req.params;
  const userId = req.user.id;

  try {
    const user = await usersService.getUserById(userId);
    // const cartId = user.cart
    const cart = await cartsService.findCart(cid)

    const unavalibleProducts = [];

    // const productsToUpdateStock = [];
    // const productsNotToUpdateStock = [];

    console.log('carrito', cart)

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;
      const amount = product.price * quantity
      // console.log('nombre', product.title)
      // console.log('amount', amount)

      const productInStock = await productModel.findById(product._id);

      // if (productInStock.stock >= quantity) {
      // 	productInStock.stock -= quantity;
      // 	await productInStock.save();
      // } else {
      // 	unavalibleProducts.push(product._id)
      // }

    }

    const amount = cart.products.product.price.reduce((acc, el) => acc + el, 0)
    console.log(amount)


    // if (unavalibleProducts.length > 0) {
    // 	res.status(400).json({ message: 'Algunos productos no se pudieron comprar', unavalibleProducts });
    // } else {
    // 	const ticket = {
    //     	// amount: ,
    //       // purchaser:
    // 	}
    // 	await ticket.save();
    // 	await cart.findByIdAndUpdate(cartId);
    // 	// res.json({ message: 'Compra finalizada' });
    // }
    const response = cartsService.findCart(cid)

    res.status(200).send({ message: 'Successful purchase', response: response });
  } catch (error) {
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