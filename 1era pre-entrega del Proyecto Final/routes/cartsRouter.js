// imports packages
const express = require('express')
const cartsRouter = express.Router()

// Methods
cartsRouter.post('/', (req, res) => {
    // crear el carrito
    res.send('carrito creado')
});

cartsRouter.get('/:cid', (req, res) => {
    const carritoId = req.params.cid
    // mostrar los productos que pertenezcan al carrito con ese cid
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const carritoId = req.params.cid
    const productoId = req.params.pid
    // agregar el producto al carrito
});


// exports
module.exports = {
    cartsRouter,
}
