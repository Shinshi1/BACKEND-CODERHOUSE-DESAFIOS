// imports packages
const express = require('express')
const cartsRouter = express.Router()

// import File System
const { gestionProd } = require('../fileSystem/ProductManager')

// Methods
cartsRouter.post('/', (req, res) => {
    // crear el carrito
    
    res.status(200).send('cart created')
});

cartsRouter.get('/:cid', (req, res) => {
    const carritoId = req.params.cid
    // mostrar los productos que pertenezcan al carrito con ese cid
    // const carts = ...
    cart = carts.find((c) = c.id === Number(carritoId))
    res.status(200).send(cart)
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
