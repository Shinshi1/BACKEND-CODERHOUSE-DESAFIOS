class ProductRepository {
  constructor(dao) {
    this.dao = dao
  };

  getProducts = async (page, limit, category, status, sort) => {
    let result = await this.dao.read(page, limit, category, status, sort);
    return result;
  };

  createProduct = async (product) => {
    let result = await this.dao.create(product);
    return result;
  };

  deleteProduct = async (productId) => {
    let result  = await this.dao.delete(productId);
    return result;
  };

  updateProduct = async (productId, product) => {
    let result = await this.dao.update(productId, product);
    return result;
  };

  findProductById = async (productId) => {
    let result = await this.dao.findProductById(productId);
    return result
  }
};

module.exports = ProductRepository;
