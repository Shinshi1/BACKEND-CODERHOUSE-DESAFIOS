const mongoose = require('mongoose');
const { cartModel } = require('./carts.model.js')

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
    // validación de cart
    /* 
    validate: {
      validator: function (value) {
        return value !== undefined;
      },
      message: 'cart is required'
    }
    */
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
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

// userSchema.pre('create', async function (next) {
//   if (!this.cart) {
//     try {
//       const newCart = await cartModel.create({});
//       this.cart = newCart._id;
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;