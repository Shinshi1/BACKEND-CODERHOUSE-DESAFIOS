const mongoose = require('mongoose')

const schemaOptions = {
    versionKey: false
};

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: [],
    }
}, schemaOptions);

cartSchema.pre('findById', function () {
    this.populate('products.product')
})

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = {
    cartModel
}