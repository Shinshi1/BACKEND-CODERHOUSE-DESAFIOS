// imports packages
const express = require('express')
const productsRouter = express.Router()

// Methods
productsRouter.get('/', (req, res) => {
    // Deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

    //Debe recibir los productos ↓ 
    // const products = ...
    const limit = req.query.limit
    let respuesta = products;

    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit)
    }
    res.status(200).send(respuesta)
});

productsRouter.get('/:pid', (req, res) => {
    // deberá traer sólo el producto con el id proporcionado.
    const { pid } = req.params;
    // const products = ...
    const product = products.find((p) => p.code === Number(pid));
    res.status(200).send(product)
});

productsRouter.post('/', (req, res) => {
    // deberá agregar un nuevo producto con sus campos correspondientes.
    // const products = ...
    const product = {
        title: req.body.title,
        description: req.body.description,
        code: Number(),
        price: Number(req.body.price),
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnail: [req.body.thumbnail],
    }
    res.status(200).send('product added')
});

productsRouter.put('/:pid', (req, res) => {
    // deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
    const { pid } = req.params
    // const products = ...
    productToUpdate = products.find((p) => p.code === Number(pid))
    productUpdated = {
        ...productToUpdate,
        title: req.body.title,
        code: Number(pid), // productToUpdated.code
        price: Number(req.body.price),
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnail: [req.body.thumbnail] //opcional
    }
    res.status(200).send('product updated')
})

productsRouter.delete('/:pid', (req, res) => {
    // deberá eliminar el producto con el pid indicado.
    const { pid } = req.params
    // const products = ...
    products = prodcuts.filter((p) => p.code !== Number(pid));
    res.status(200).send('product deleted')
    
})

// exports
module.exports = {
    productsRouter,
}