// importar todos los DAOs
const { MongoCartDao, MongoProductDao } = require('../dao/mongo/DBManager.js');
const { MemoryCartDao } = require('../dao/fileSystem/CartManager.js')
const { MemoryProductDao } = require('../dao/fileSystem/ProductManager.js')
const { PERSISTENCE } = require('../config/config.js');

const memoryCartDao = new MemoryCartDao();
const mongoCartDao = new MongoCartDao();
const memoryProductDao = new MemoryProductDao();
const mongoProductDao = new MongoProductDao();

const CARTSDAO = PERSISTENCE === 'MEMORY' ? memoryCartDao : mongoCartDao;
const PRODUCTSDAO = PERSISTENCE === 'MEMORY' ? memoryProductDao : mongoProductDao;

module.exports = {
  CARTSDAO,
  PRODUCTSDAO
}