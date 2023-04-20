const { cartsService } = require('../repositories/index.js');

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

module.exports = {
  getCarts,
  saveCart,
  deleteCart,
  addOneProductToCart,
  deleteProductFromCart,
  addProductsToCart,
  deleteAllProductsFromCart,
  getCartById,
}