const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
// const { usersService } = require('../../../repositories/index.js');
const userModel = require('./users.model.js');

const schemaOptions = {
  versionKey: false,
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
      validator: function (value) {
        this.ownerEmail = value;
        return true
      }
    }
  }
}, schemaOptions);

productSchema.plugin(mongoosePaginate)
productSchema.plugin(mongooseAggregatePaginate)

productSchema.pre('save', async function (next) {
  const user = await userModel.findOne({ email: this.ownerEmail })
  if (user && user.role !== 'premium') {
    return this.owner = 'admin'
  }
  next()
})

const productModel = mongoose.model(productCollection, productSchema);

module.exports = {
  productModel
}
