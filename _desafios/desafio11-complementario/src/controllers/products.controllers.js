const { productsService } = require('../repositories/index.js')

const getProducts = async (req, res) => {
  const { limit, page, category, status, sort } = req.query;
  // const {category} = req.params;
  try {
    let product = await productsService.getProducts(page, limit, category, status, sort);

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
    req.logger.error(`error getting products: ${error.message}`)
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
    owner
  } = req.body

  if (!title || !description || !code || !price || !thumbnail || !stock || !category || !owner) {
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
      owner
    })
    res.status(200).send({ message: 'Producto creado', response })
  } catch (error) {
    req.logger.error(`error saving product: ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userEmail = req.session.user?.email;

  try {
    const product = await productsService.findProductById(id)

    if (!product) {
      return res.status(404).send({ error: 'Producto no encontrado' })
    }
    
    if (req.session.user.role === 'admin') {
      const response = await productsService.deleteProduct(id);
      res.status(200).send({ message: 'Producto eliminado', response });
    } else if (product.owner === userEmail) {
      const response = await productsService.deleteProduct(id);
      res.status(200).send({ message: 'Producto eliminado', response });
    } else {
      res.status(403).send({ error: 'No tienes permisos para borrar este producto' })
    }
  } catch (error) {
    req.logger.error(`error deleting products: ${error.message}`)
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
    req.logger.error(`error updating products: ${error.message}`)
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
    req.logger.error(`error finding products: ${error.message}`)
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