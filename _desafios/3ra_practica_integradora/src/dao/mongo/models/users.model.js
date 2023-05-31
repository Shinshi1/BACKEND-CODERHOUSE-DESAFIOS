const mongoose = require('mongoose');
const { cartModel } = require('./carts.model.js');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'premium'],
    default: 'user'
  }
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.cart) {
      const newCart = await cartModel.create({});
      this.cart = newCart._id;
      next();
    }
  } catch (error) {
    next(error);
  }})

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;