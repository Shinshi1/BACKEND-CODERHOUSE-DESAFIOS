const { expect } = require('chai');
const { productsService } = require('../../src/repositories/index.js');
const { dropProducts } = require('../setup.test.js');

// mongoose.connect('')

describe('test cases of the product services', () => {
  before(async () => {
    // await dropProducts()
  });

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

  let pidDeleteProduct
  let pidFindProduct

  it('should return an array with all products in database when calling getAllProducts()', async () => {
    let result = await productsService.getProducts()
    expect(Array.isArray(result.docs)).to.be.eqls(true)
  })
  it('The service should create a product in the database.', async () => {
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
    let result = await productsService.createProduct(product);
    pidDeleteProduct = result._id
    expect(result._id).to.exist;
  })
  it('The service should delete a product in the database.', async () => {
    await productsService.deleteProduct(pidDeleteProduct);
    let productExist = await productsService.findProductById(pidDeleteProduct)
    expect(productExist).to.not.exist;
  })
  it('The service should update a product in the database.', async () => {
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
    const newProduct = {
      title: 'Pulsera Nueva',
      description: 'Es una pulsera de color azul y amarillo',
      code: generarCode(),
      price: generarNumero(1, 30),
      thumbnail: 'imagen.jpg',
      stock: 100,
      category: 'accesorio',
      status: true,
      owner: 'juan@mail.com'
    }
    let productCreated = await productsService.createProduct(product);
    let result = await productsService.updateProduct(productCreated._id, newProduct)
    expect(result).to.be.not.eql(productCreated);

    pidFindProduct = productCreated._id
  })
  it('The service should update a product in the database.', async () => {
    let result = await productsService.findProductById(pidFindProduct)
    expect(result._id).to.exist
  })
})