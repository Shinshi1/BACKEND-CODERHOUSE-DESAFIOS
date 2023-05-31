const { productsService } = require('../repositories/index.js')

const getProducts = async (req, res) => {
  const { limit, page, category, status, sort } = req.query;
  // const {category} = req.params;
  try {
    let product = await productsService.getProducts(page, limit, category, status, sort);



    // console.log('products.routes.js', product)
    const productExist = () => {
      if (Boolean(product.docs)) return 'success'
      else return 'error'
    }
    res.send({
      status: productExist(),
      payload: product.docs,
      totalDocs: product.totalDocs,
      limit: product.limit,
      totalPages: product.totalPages,
      page: product.page,
      pagingCounter: product.pagingCounter,
      hasPrevPage: product.hasPrevPage,
      hasNextPage: product.hasNextPage,
      prevLink: product.prevPage,
      nextLink: product.nextPage
    })

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const saveProduct = async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
    status,
  } = req.body

  if (!title || !description || !code || !price || !thumbnail || !stock || !category) {
    res.status(400).send({ error: 'Faltan datos' })
  }
  try {
    const response = await productsService.createProduct({
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    })
    res.status(200).send({ message: 'Producto creado', response })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await productsService.deleteProduct(id);

    if (Boolean(response) === true) {
      res.status(200).send({ message: 'Producto eliminado', response });
    } else {
      res.status(500).send({ message: 'Producto no encontrado', response });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
    status,
  } = req.body

  if (!title || !description || !code || !price || !thumbnail || !stock || !category) {
    res.status(400).send({ error: 'Faltan datos' })
  }

  try {
    const response = await productsService.updateProduct(id, {
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    })
    res.status(200).send({ message: 'Producto actualizado', response })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const findProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsService.findProductById(id);
    if (response) {
      res.status(200).send({ message: 'Producto encontrado', response });
    } else {
      res.status(500).send({ message: 'Producto no encontrado', response });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getProducts,
  saveProduct,
  deleteProduct,
  updateProduct,
  findProduct
}