// import factory
const { CARTSDAO, PRODUCTSDAO, USERSDAO, TICKETDAO } = require('../dao/index.js')

// import service/repository
const CartRepository = require('./carts.repository.js')
const ProductRespository = require('./products.repository.js')
const UserRespository = require('./users.repository.js')
const TicketRepository = require('./tickets.repository.js');

const cartsService = new CartRepository(CARTSDAO);
const productsService = new ProductRespository(PRODUCTSDAO);
const usersService = new UserRespository(USERSDAO);
const ticketService = new TicketRepository(TICKETDAO);

module.exports = {
  cartsService,
  productsService,
  usersService,
  ticketService,
}