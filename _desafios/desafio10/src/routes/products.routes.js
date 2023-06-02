// --- imports packages ---
const express = require('express')
const productsRouter = express.Router()

// import middleware
const { isAdmin } = require('../middlewares/auth.middleware')

// import Controller
const { getProducts, saveProduct, deleteProduct, updateProduct, findProduct } = require('../controllers/products.controllers.js');

// Methods
productsRouter.get('/', getProducts);

productsRouter.post('/', isAdmin, saveProduct)

productsRouter.delete('/:id', isAdmin, deleteProduct)

productsRouter.put('/:id', isAdmin, updateProduct)

productsRouter.get('/:id', findProduct)

// exports
module.exports = {
    productsRouter,
}