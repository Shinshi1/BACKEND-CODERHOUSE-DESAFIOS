const mongoose = require('mongoose');
// const { CARTSDAO } = require('../src/dao/index')
const { cartModel } = require('../src/dao/mongo/models/carts.model.js');
const { productModel } = require('../src/dao/mongo/models/products.model.js');
const userModel = require('../src/dao/mongo/models/users.model.js');

before(async () => {
  // await mongoose.connect('mongodb://127.0.0.1:27017/desafio11TestingAvanzado')
})

after(async () => {
  mongoose.connection.close();
})

const dropCarts = async () => {
  await cartModel.collection.drop();
}

const dropProducts = async () => {
  await productModel.collection.drop();
}

const dropUsers = async () => {
  await userModel.collection.drop();
}

module.exports = {
  dropCarts,
  dropProducts,
  dropUsers
}