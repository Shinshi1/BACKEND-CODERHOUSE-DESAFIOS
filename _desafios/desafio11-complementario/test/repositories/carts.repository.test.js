const { expect } = require('chai');
// const mongoose = require('mongoose');
const { cartsService, productsService, usersService } = require('../../src/repositories/index.js');
const { dropCarts, dropProducts, dropUsers } = require('../setup.test.js');
const userModel = require('../../src/dao/mongo/models/users.model.js');

describe('test cases of the cart services', () => {
  before(async () => {
    await dropCarts()
    await dropProducts()
  })

  afterEach(async () => {

  })

  after(async () => {
    // await dropUsers()
    await userModel.findOneAndDelete({ email: 'juan@mail.com' })
  })
  let uidDelete

  let cidDeleteProduct
  let pidDeleteProduct
  let cidDelete
  let cidDeleteAllProducts
  const generarNumero = (min, max) => {
    const rango = max - min;
    const precio = Math.random() * rango + min;
    return Math.round(precio)
  }
  const generarCode = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    for (let i = 0; i < 10; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      code += caracteres.charAt(indiceAleatorio);
    }
    return code
  }

  it('The service should get all the carts in array format', async () => {
    let result = await cartsService.getCarts();
    expect(Array.isArray(result)).to.be.equals(true);
  })
  it('The service should create a cart in the database.', async () => {
    let result = await cartsService.createCart();
    cidDelete = result._id
    expect(result._id).to.exist;
  })
  it('The service should delete a cart in the database.', async () => {
    let result = await cartsService.deleteCart(cidDelete)
    expect(result._id).to.eqls(cidDelete);
  })
  it('The service should add a product to the cart in the database.', async () => {
    const user = {
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'juan@mail.com',
      password: '1234',
      age: '21',
      role: 'admin'
    }
    await usersService.createUser(user);
    const product = {
      title: 'pulsera',
      description: 'es una pulsera de color azul y amarillo',
      code: generarCode(),
      price: generarNumero(1, 30),
      thumbnail: 'imagen.jpg',
      stock: 100,
      category: 'accesorio',
      status: true,
      owner: 'juan@mail.com'
    }
    let productSaved = await productsService.createProduct(product)
    let cartCreated = await cartsService.createCart();
    let result = await cartsService.addSingleProductToCart(cartCreated._id, productSaved)

    pidDeleteProduct = productSaved._id
    cidDeleteProduct = cartCreated._id

    expect(result).to.have.property('products').that.is.an('Array');
    const foundProduct = result.products.find(p => p.product === productSaved._id);
    expect(foundProduct).to.exist;
    expect(foundProduct.quantity).to.equal(1);
  })
  it('The service should delete a product from the cart in the database.', async () => {
    const result = await cartsService.deleteProduct(cidDeleteProduct, pidDeleteProduct);
    expect(result.modifiedCount).to.eql(1)
    await dropCarts()
  })
  it('The service should update a product from the cart in the database.', async () => {
    const product = {
      title: 'pulsera',
      description: 'es una pulsera de color azul y amarillo',
      code: generarCode(),
      price: generarNumero(1, 30),
      thumbnail: 'imagen.jpg',
      stock: 100,
      category: 'accesorio',
      status: true,
      owner: 'juan@mail.com'
    }
    let productSaved = await productsService.createProduct(product)
    let cartCreated = await cartsService.createCart();
    let result = await cartsService.updateProduct(cartCreated._id, productSaved._id, generarNumero(1, 15))
    expect(result.modifiedCount).to.eql(1)
    let cartUpdated = await cartsService.findCart(cartCreated._id)
    cidDeleteAllProducts = cartUpdated._id
  })
  it('The service should delete all products from the cart in the database.', async () => {
    let result = await cartsService.deleteAllProducts(cidDeleteAllProducts);
    expect(result.modifiedCount).to.eql(1);
    await dropCarts();
  })
  it('The service should find a cart for by its id in the database.', async () => {
    let cartCreated = await cartsService.createCart();
    let result = await cartsService.findCart(cartCreated._id);
    expect(result).to.exist;
  })
})