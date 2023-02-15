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

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = {
    cartModel
}