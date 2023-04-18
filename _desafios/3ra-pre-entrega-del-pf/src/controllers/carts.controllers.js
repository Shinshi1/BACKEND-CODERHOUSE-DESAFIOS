const { CARTSDAO } = require("../dao/index.js");

const getCarts = async (req, res) => {
  try {
    const result = await CARTSDAO.getAll()
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const saveCart = async (req, res) => {
  try {
    const response = await CARTSDAO.save();
    res.status(200).send({ message: 'carrito creado', response })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CARTSDAO.delete(id);

    if (response === true) {
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
    const response = await CARTSDAO.addSingleProductToCart(cid, product);
    res.status(200).send({ message: 'Carrito actualizado!', response })
  } catch (error) {
    res.status(500).send(error.message);
  };
}

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params
  try {
    await CARTSDAO.deleteProduct(cid, pid)

    res.status(200).send({ message: `product ${pid} deleted from cart ${cid}` })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const addProductsToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await CARTSDAO.updateProduct(cid, pid, quantity)
    res.status(200).send({ message: `quantity of product ${pid} in cart ${cid} increased by ${quantity}` })

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;

  try {
    await CARTSDAO.deleteAllProducts(cid)
    res.status(200).send({ message: `all products deleted from cart ${cid}` })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const response = await CARTSDAO.findById(cid);
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