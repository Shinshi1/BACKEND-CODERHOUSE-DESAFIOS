// --- imports packages ---
const express = require('express')
const productsRouter = express.Router()

// import middleware
const { isAdmin, isAdminOrPremium } = require('../middlewares/auth.middleware')

// import Controller
const { getProducts, saveProduct, deleteProduct, updateProduct, findProduct } = require('../controllers/products.controllers.js');

// Methods
productsRouter.get('/', getProducts);

productsRouter.post('/', isAdminOrPremium, saveProduct)

productsRouter.delete('/:id', isAdminOrPremium, deleteProduct)

productsRouter.put('/:id', isAdmin, updateProduct)

productsRouter.get('/:id', findProduct)

// exports
module.exports = {
    productsRouter,
}