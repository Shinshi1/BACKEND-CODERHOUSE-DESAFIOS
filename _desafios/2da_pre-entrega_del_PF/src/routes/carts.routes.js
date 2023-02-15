// imports packages
const express = require('express')
const cartsRouter = express.Router()

// import DBManager
const { CartManager } = require('../dao/DBManager.js')
const cartManager = new CartManager()

// Methods
cartsRouter.get('/', async (req, res) => {
    try {
        const result = await cartManager.read()
        res.send(result)

    } catch (error) {
        res.status(500).send(error.message)
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.create()
        res.status(200).send({ message: 'carrito creado', response })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

cartsRouter.delete('/:id', async (req, res) => {
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
})

cartsRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const product = req.body
    try {
        const response = await cartManager.update(cid, product)
        res.status(200).send({ message: 'Carrito actualizado', response })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// exports
module.exports = {
    cartsRouter,
}
