const mongoose = require('mongoose')

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {type: String, unique: true},
    price: Number,
    thumbnail: String,
    stock: Number,
    category: String,
    status: Boolean,
});

const productModel = mongoose.model(productCollection, productSchema)

module.exports = {
    productModel
}
