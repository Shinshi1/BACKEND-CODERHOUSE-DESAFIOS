const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid')

faker.locale = 'es';

const generateProducts = (numProducts) => {
  const categories = ['Electrónica', 'Ropa', 'Hogar', 'Juguetes', 'Alimentos', 'Belleza'];
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    const product = {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: uuidv4(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image(),
      stock: faker.random.numeric(1),
      category: faker.helpers.arrayElement(categories),
      status: faker.datatype.boolean(),
    };
    products.push(product);
  }
  return products;
}

module.exports = {
  generateProducts,
}