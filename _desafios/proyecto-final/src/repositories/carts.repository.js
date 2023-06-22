class CartRepository {
  constructor(dao) {
    this.dao = dao
  };

  getCarts = async () => {
    let result = await this.dao.getAll()
    return result;
  };

  createCart = async () => {
    let result = await this.dao.save();
    return result;
  };

  deleteCart = async (cartId) => {
    let result  = await this.dao.delete(cartId);
    return result;
  };

  addSingleProductToCart = async (cartId, product) => {
    let result = await this.dao.addSingleProductToCart(cartId, product);
    return result;
  };

  deleteProduct = async (cartId, productId) => {
    let result = await this.dao.deleteProduct(cartId, productId);
    return result;
  }

  updateProduct = async (cartId, productId, quantity) => {
    let result = await this.dao.updateProduct(cartId, productId, quantity);
    return result;
  }

  deleteAllProducts = async (cartId) => {
    let result = await this.dao.deleteAllProducts(cartId);
    return result;
  }

  findCart = async (cartId) => {
    let result = await this.dao.findById(cartId);
    return result;
  }

  finishPurchase = async (cartId) => {
    let result = await this.dao.purchase(cartId);
    return result;
  }
}

module.exports = CartRepository