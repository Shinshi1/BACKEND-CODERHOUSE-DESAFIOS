const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const schemaOptions = {
    versionKey: false
};

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: { type: String, unique: true },
    price: Number,
    thumbnail: String,
    stock: Number,
    category: String,
    status: Boolean,
}, schemaOptions);

productSchema.plugin(mongoosePaginate)
productSchema.plugin(mongooseAggregatePaginate)

const productModel = mongoose.model(productCollection, productSchema);

module.exports = {
    productModel
}
