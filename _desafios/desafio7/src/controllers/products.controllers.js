const { PRODUCTSDAO } = require('../dao/index.js')

const getProducts = async (req, res) => {
  const { limit, page, category, status, sort } = req.query;
  // const {category} = req.params;
  try {
    let product = await PRODUCTSDAO.read(page, limit, category, status, sort)
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
    response = await PRODUCTSDAO.create({
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
    const response = await PRODUCTSDAO.delete(id);

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
    const response = await PRODUCTSDAO.update(id, {
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

module.exports = {
  getProducts,
  saveProduct,
  deleteProduct,
  updateProduct,
}