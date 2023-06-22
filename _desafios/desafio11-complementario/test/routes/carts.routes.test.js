const { expect } = require('chai');
const supertest = require('supertest');
const { cartsRouter } = require('../../src/routes/carts.routes.js')
const { app } = require('../../src/app');
const { dropUsers } = require('../setup.test.js');
const requester = supertest.agent(app);


describe('Carts router test cases', () => {
  after(async () => {
    // await dropUsers()
  })
  before(async () => {
    const responseAuthentication = await requester.post('/login/').send({ username: 'erwin@mail.com', password: '1234' })
    console.log(responseAuthentication.statusCode)
  })
  let cidDelete
  let cidAddAndRemoveProduct
  let pidAddAndRemoveFromCart

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


  it('[GET] /api/carts - Should get all the carts', async () => {
    const response = await requester.get('/api/carts/');
    expect(Array.isArray(response.body)).to.be.eqls(true)
  });

  it('[POST] /api/carts - Should create a cart', async () => {
    const response = await requester.post('/api/carts/');
    expect(response.body.response._id).to.exist
    cidDelete = response.body.response._id
  });

  it('[DELETE] /api/carts/deleteCart/:id - Should delete a cart', async () => {
    const response = await requester.delete(`/api/carts/deleteCart/${cidDelete}`);
    expect(response.body.message).to.be.eql('Carrito eliminado');
    expect(response.body.response._id).to.be.eql(cidDelete)
  });

  it('[PUT] /api/carts/:cid - Should add one product to cart', async () => {
    // Crear Producto
    const responseProduct = await requester.post('/api/products').send({
      title: 'pulsera',
      description: 'es una pulsera de color azul y amarillo',
      code: generarCode(),
      price: generarNumero(1, 30),
      thumbnail: 'imagen.jpg',
      stock: 100,
      category: 'accesorio',
      status: true,
      owner: 'erwin@mail.com'
    })
    pidAddAndRemoveFromCart = responseProduct.body.response._id
    // Crear Carrito
    const responseCartCreated = (await requester.post('/api/carts/'))
    cidAddAndRemoveProduct = responseCartCreated.body.response._id

    // Agregar producto al carrito
    const response = await requester.put(`/api/carts/${cidAddAndRemoveProduct}`).send({ _id: pidAddAndRemoveFromCart });

    expect(response.body.message).to.be.eql('Carrito actualizado!');
    expect(response.body.response._id).to.exist
  });

  it('[DELETE] /api/carts/:cid/products/:pid - Should delete one product to cart', async () => {
    // Eliminar producto del carrito
    const response = await requester.delete(`/api/carts/${cidAddAndRemoveProduct}/products/${pidAddAndRemoveFromCart}`);
    expect(response.body.message).to.be.eql(`product ${pidAddAndRemoveFromCart} deleted from cart ${cidAddAndRemoveProduct}`);
  });

  it('[PUT] /api/carts/:cid/products/:pid - Should Add products to cart', async () => {
    const quantity = generarNumero(1, 10)
    const response = await requester.put(`/api/carts/${cidAddAndRemoveProduct}/products/${pidAddAndRemoveFromCart}`).send({ quantity });
    expect(response.body.message).to.be.eql(`quantity of product ${pidAddAndRemoveFromCart} in cart ${cidAddAndRemoveProduct} increased by ${quantity}`);
  });

  it('[DELETE] /api/carts/:cid - Should delete all products from the cart', async () => {
    const response = await requester.delete(`/api/carts/${cidAddAndRemoveProduct}`);
    expect(response.body.message).to.be.eql(`all products deleted from cart ${cidAddAndRemoveProduct}`);
  });

  it('[GET] /api/carts/:cid - Should get cart by ID', async () => {
    const response = await requester.get(`/api/carts/${cidAddAndRemoveProduct}`);
    expect(response.body.message).to.be.eql(`Cart found`);
    expect(response.statusCode).to.be.eql(200)
  });

  it('[GET] /api/carts/:cid/purchase - Should finalize the purchase', async () => {
    // Agregamos productos al carrito
    const quantity = generarNumero(1, 10)
    await requester.put(`/api/carts/${cidAddAndRemoveProduct}/products/${pidAddAndRemoveFromCart}`).send({ quantity });
    // Simulamos compra
    const response = await requester.get(`/api/carts/${cidAddAndRemoveProduct}/purchase`);
    expect(response.body.message).to.be.eql(`Successful purchase`);
    expect(response.statusCode).to.be.eql(200)
  });

});