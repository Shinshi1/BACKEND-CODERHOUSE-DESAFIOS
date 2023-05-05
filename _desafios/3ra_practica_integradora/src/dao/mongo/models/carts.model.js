const mongoose = require('mongoose')

const schemaOptions = {
    versionKey: false
};

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number,
                _id: false,
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