// --- imports packages ---
const express = require('express')
const productsRouter = express.Router()

// import middleware
const { isAdmin } = require('../middlewares/auth.middleware')

// import Controller
const { getProducts, saveProduct, deleteProduct, updateProduct } = require('../controllers/products.controllers.js');

// Methods
productsRouter.get('/', getProducts);

// productsRouter.get('/:query', async (req, res) => {
//     const {limit, page} = req.query;
//     const {query} = req.params;
//     try {
//         let product = await productManager.read(page, limit)
//         const productExist = () => {
//             if (Boolean(product.docs)) return 'success'
//             else return 'error'
//         }

//         let categoria = product.docs.find((p)  => p.category.toString() = query.toString())
//         console.log(categoria)

//         res.send({
//             status: productExist(),
//             payload: product.docs,
//             totalDocs: product.totalDocs, 
//             limit: product.limit, 
//             totalPages: product.totalPages, 
//             page: product.page, 
//             pagingCounter: product.pagingCounter, 
//             hasPrevPage: product.hasPrevPage,
//             hasNextPage: product.hasNextPage,
//             prevLink: product.prevPage,
//             nextLink: product.nextPage
//         })

//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// });

productsRouter.post('/', isAdmin, saveProduct)

productsRouter.delete('/:id', isAdmin, deleteProduct)

productsRouter.put('/:id', isAdmin, updateProduct)

// exports
module.exports = {
    productsRouter,
}