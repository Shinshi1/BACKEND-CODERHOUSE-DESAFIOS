// imports packages
const express = require('express')
const cartsRouter = express.Router()

// import DBManager
const { CartManager } = require('../dao/DBManager.js')
const cartManager = new CartManager()

// Methods
// obtener carritos
cartsRouter.get('/', async (req, res) => {
    try {
        const result = await cartManager.read()
        res.send(result)

    } catch (error) {
        res.status(500).send(error.message)
    }
});

// crear carrito
cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.create()
        res.status(200).send({ message: 'carrito creado', response })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// eliminar carrito
cartsRouter.delete('deleteCart/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await cartManager.delete(id)

        if (response === true) {
            res.status(200).send({ message: 'Carrito eliminado', response })
        }
        else {
            res.status(404).send({ message: 'Carrito no encontrado', response })
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
});

// agregar 1 producto al carrito / quantity + 1 de producto
cartsRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const product = req.body
    try {
        const response = await cartManager.update(cid, product)
        res.status(200).send({ message: 'Carrito actualizado', response })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// 2DA PRE-ENTREGA PF ↓
// eliminar del carrito el producto seleccionado
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        await cartManager.deleteProduct(cid, pid)

        res.status(200).send({ message: `product ${pid} deleted from cart ${cid}` })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await cartManager.updateProduct(cid, pid, quantity)
        res.status(200).send({ message: `quantity of product ${pid} in cart ${cid} increased by ${quantity}` })

    } catch (error) {
        res.status(500).send(error.message)
    }
});

// eliminar todos los productos del carrito
cartsRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        await cartManager.deleteAllProducts(cid)
        res.status(200).send({ message: `all products deleted from cart ${cid}` })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// obtener 1 carrito por id
cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const response = await cartManager.findByID(cid);
        res.status(200).send({ message: 'Cart found', response: response})
    } catch (error) {
        res.status(500).send(error.message)
    }
});


// exports
module.exports = {
    cartsRouter,
}
