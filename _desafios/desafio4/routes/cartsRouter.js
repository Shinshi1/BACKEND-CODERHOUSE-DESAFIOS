// imports packages
const express = require('express')
const cartsRouter = express.Router()

// import File System
const { gestionCart } = require('../fileSystem/CartManager');
const { gestionProd } = require('../fileSystem/ProductManager');

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

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    // agregar el producto al carrito
       
    let cart = await gestionCart.getCartById(Number(cid))
    let product = await gestionProd.getProductById(Number(pid))

    const productAdd = {
        id: product.id,
        quantity: 1
    }
    // console.log('este es el producto', product)
    // agregar if que controle que no se pueda agregar mas del stock del producto
    gestionCart.addToCart(cart, productAdd)

    // cart.products.push(Number(pid))
    res.status(200).send('product added to cart')
});


// exports
module.exports = {
    cartsRouter,
}
