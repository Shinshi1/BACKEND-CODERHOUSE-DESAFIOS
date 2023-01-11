// imports packages
const express = require('express')
const productsRouter = express.Router()

// Methods
productsRouter.get('/', (req, res) => {
    // deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
});

productsRouter.get('/:pid', (req, res) => {
    // deberá traer sólo el producto con el id proporcionado.
});

productsRouter.post('/', (req, res) => {
    // deberá agregar un nuevo producto con sus campos correspondientes.
});

productsRouter.put('/:pid', (req, res) => {
    // deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
})

productsRouter.delete('/:pid', (req, res) => {
    // deberá eliminar el producto con el pid indicado.
})

// exports
module.exports = {
    productsRouter,
}