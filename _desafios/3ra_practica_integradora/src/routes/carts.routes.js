// imports packages
const express = require('express')
const cartsRouter = express.Router()

// import middleware
const { isUser } = require('../middlewares/auth.middleware.js');

// import controller
const CartController = require('../controllers/carts.controllers.js');

// Methods
// obtener carritos
cartsRouter.get('/', CartController.getCarts);

// crear carrito
cartsRouter.post('/', CartController.saveCart);

// eliminar carrito
cartsRouter.delete('/deleteCart/:id', CartController.deleteCart);

// agregar 1 producto al carrito / quantity + 1 de producto
cartsRouter.put('/:cid', /*isUser,*/ CartController.addOneProductToCart);

// 2DA PRE-ENTREGA PF ↓
// eliminar del carrito el producto seleccionado
cartsRouter.delete('/:cid/products/:pid', CartController.deleteProductFromCart);

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
cartsRouter.put('/:cid/products/:pid', CartController.addProductsToCart);

// eliminar todos los productos del carrito
cartsRouter.delete('/:cid', CartController.deleteAllProductsFromCart);

// obtener 1 carrito por id
cartsRouter.get('/:cid', CartController.getCartById);

// finalizar compra
cartsRouter.get('/:cid/purchase', CartController.finalizePurchase);


// exports
module.exports = {
    cartsRouter,
}
