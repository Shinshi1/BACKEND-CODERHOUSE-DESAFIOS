const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../../src/app');
const { productsService } = require('../../src/repositories');

const requester = supertest.agent(app)

describe('Product router test cases', () => {
  after(async () => {

  });

  before(async () => {
    await requester.post('/login').send({ username: 'erwin@mail.com', password: '1234' })
  });

  let pid

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

  it('[GET] /api/products/ - Should get all products', async () => {
    const response = await requester.get('/api/products');
    expect(Array.isArray(response.body.payload)).to.be.eqls(true);
    expect(response.body.status).to.be.eqls('success');
  });

  it('[POST] /api/products/ - Should create a product', async () => {
    const response = await requester.post('/api/products').send({
      title: 'pulsera',
      description: 'es una pulsera de color azul y amarillo',
      code: generarCode(),
      price: generarNumero(1, 30),
      thumbnail: 'imagen.jpg',
      stock: 100,
      category: 'accesorio',
      status: true,
      owner: 'erwin@mail.com'
    });
    expect(response.body.message).to.be.eqls('Producto creado');
    expect(response.body.response._id).to.exist;
    pid = response.body.response._id
  });

  it('[PUT] /api/products/:id - Should update a product', async () => {
    const response = await requester.put(`/api/products/${pid}`).send({
      title: 'pulsera de boca',
      description: 'es una pulsera de color azul y amarillo',
      code: generarCode(),
      price: generarNumero(1, 30),
      thumbnail: 'imagen.jpg',
      stock: 100,
      category: 'accesorio',
      status: true,
      owner: 'erwin@mail.com'
    });
    const productUpdated = await productsService.findProductById(pid);
    expect(productUpdated.title).to.be.eqls('pulsera de boca');
    expect(productUpdated.title).to.be.not.eqls('pulsera');
    expect(response.body.message).to.be.eqls('Producto actualizado');
  });

  it('[GET] /api/products/:id - Should get a product', async () => {
    const response = await requester.get(`/api/products/${pid}`);
    expect(response.body.message).to.be.eqls('Producto encontrado');
    expect(response.body.response._id).to.be.eqls(pid);
  });

  it('[DELETE] /api/products/:id - Should delete a product', async () => {
    const response = await requester.delete(`/api/products/${pid}`);
    expect(response.body.message).to.be.eqls('Producto eliminado');
    expect(response.body.response._id).to.be.eqls(pid);
  });
})

