// imports packages
const express = require('express')
const cartsRouter = express.Router()

// import File System
const { gestionCart } = require('../fileSystem/CartManager')

// Methods
cartsRouter.post('/', (req, res) => {
    // crear el carrito
    const cart = {
        products: []
    }
    gestionCart.addCart(cart)
    res.status(200).send('cart created')
});

cartsRouter.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    // mostrar los productos que pertenezcan al carrito con ese cid
    const carts = await gestionCart.getCarts()
    let cart = carts.find((c) => c.id === Number(cid))
    if (cart) {
        res.status(200).send(cart.products)
    }
    console.error('Error: cart not found with that cid')
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const carritoId = req.params.cid
    const productoId = req.params.pid
    // agregar el producto al carrito
    // const carts = ...
    cart = carts.find((c) => c.id === Number(carritoId))
    const product = {
        code: Number(productoId),
        quantity: 1
    }
    cart.push(Number(productoId))
    res.status(200).send('product added to cart')
});


// exports
module.exports = {
    cartsRouter,
}
