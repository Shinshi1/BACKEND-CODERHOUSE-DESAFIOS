const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
// const { usersService } = require('../../../repositories/index.js');
const userModel = require('./users.model.js');

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
    owner: {
        type: String,
        default: 'admin',
        validate: {
            validator: async function (value) {
                const user = await userModel.findOne({ email: value });
                console.log(user)
                return user && user.role === 'premium';
            },
            message: 'Only premium users can be assigned as owner.'
        }
    }
}, schemaOptions);

productSchema.plugin(mongoosePaginate)
productSchema.plugin(mongooseAggregatePaginate)

const productModel = mongoose.model(productCollection, productSchema);

module.exports = {
    productModel
}
