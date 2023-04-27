// importar todos los DAOs
const { MongoCartDao, MongoProductDao } = require('../dao/mongo/DBManager.js');
const { MemoryCartDao } = require('../dao/fileSystem/CartManager.js');
const { MemoryProductDao } = require('../dao/fileSystem/ProductManager.js');
const MongoUserDao = require('./mongo/users.dao.js');
const MongoTicketDao = require('./mongo/tickets.dao.js');
const { PERSISTENCE } = require('../config/config.js');

const memoryCartDao = new MemoryCartDao();
const mongoCartDao = new MongoCartDao();
const memoryProductDao = new MemoryProductDao();
const mongoProductDao = new MongoProductDao();
const mongoUserDao = new MongoUserDao();
const mongoTicketDao = new MongoTicketDao();

const CARTSDAO = PERSISTENCE === 'MEMORY' ? memoryCartDao : mongoCartDao;
const PRODUCTSDAO = PERSISTENCE === 'MEMORY' ? memoryProductDao : mongoProductDao;
const USERSDAO = mongoUserDao
const TICKETDAO = mongoTicketDao;

module.exports = {
  CARTSDAO,
  PRODUCTSDAO,
  USERSDAO,
  TICKETDAO,
}