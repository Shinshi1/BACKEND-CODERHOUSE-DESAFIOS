const mongoose = require('mongoose')

const schemaOptions = {
    versionKey: false
};

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number,
            },
        ],
        default: [],
    }
}, schemaOptions);

// cartSchema.pre('findOne', function () {
//     this.populate('products.productId')
// })

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = {
    cartModel
}