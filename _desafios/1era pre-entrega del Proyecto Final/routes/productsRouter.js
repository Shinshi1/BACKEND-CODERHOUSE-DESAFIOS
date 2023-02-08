// --- imports packages ---
const express = require('express')
const productsRouter = express.Router()
// import File System
const { gestionProd } = require('../fileSystem/ProductManager')

// Methods
productsRouter.get('/', async (req, res) => {
    // Deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
    const products = await gestionProd.getProducts()
    const limit = req.query.limit
    let respuesta = products;

    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit)
    }
    res.status(200).send(respuesta)
});

productsRouter.get('/:pid', async (req, res) => {
    // deberá traer sólo el producto con el id proporcionado.
    const { pid } = req.params;
    const product = await gestionProd.getProductById(Number(pid))
    res.status(200).send(product)
});

productsRouter.post('/', async (req, res) => {
    // deberá agregar un nuevo producto con sus campos correspondientes.
    const products = await gestionProd.getProducts()
    const idGenerator = () => {
        let id = 1
        const lastProduct = products[products.length - 1]
        if (lastProduct) {id = lastProduct.id + 1}
        return id
    }

    const product = {
        id: idGenerator(),
        title: req.body.title,
        description: req.body.description,
        code: String(req.body.code),
        price: Number(req.body.price),
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnail: [req.body.thumbnail],
    }

    await gestionProd.addProduct(product)
    res.status(200).send('product added')
});

productsRouter.put('/:pid', async (req, res) => {
    // deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
    const { pid } = req.params;
    const productUpdated = {
        title: req.body.title,
        description: req.body.description,
        code: String(req.body.code),
        price: Number(req.body.price),
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnail: [req.body.thumbnail] //opcional
    }
    gestionProd.updateFile(Number(pid), productUpdated)

    res.status(200).send('product updated')
})

productsRouter.delete('/:pid', (req, res) => {
    // deberá eliminar el producto con el pid indicado.
    const { pid } = req.params
    gestionProd.deleteProduct(Number(pid))
    res.status(200).send('product deleted')

})

// exports
module.exports = {
    productsRouter,
}