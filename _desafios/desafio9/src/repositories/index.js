// import factory
const { CARTSDAO, PRODUCTSDAO, USERSDAO } = require('../dao/index.js')

// import service/repository
const CartRepository = require('./carts.repository.js')
const ProductRespository = require('./products.repository.js')
const UserRespository = require('./users.repository.js')

const cartsService = new CartRepository(CARTSDAO);
const productsService = new ProductRespository(PRODUCTSDAO);
const usersService = new UserRespository(USERSDAO);

module.exports = {
  cartsService,
  productsService,
  usersService,
}