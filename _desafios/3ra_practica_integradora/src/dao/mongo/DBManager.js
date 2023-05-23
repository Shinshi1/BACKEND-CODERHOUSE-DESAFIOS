// import models
const { productModel } = require('./models/products.model.js')
const { cartModel } = require('./models/carts.model.js')

class CartManager {
	async getAll() {
		try {
			const carts = await cartModel.find();
			return carts
		} catch (error) {
			throw new Error(error)
		}
	}

	async save() {
		try {
			const newCart = new cartModel()
			await newCart.save();
			return newCart
		} catch (error) {
			throw new Error(error)
		}
	}

	async delete(cartId) {
		try {
			const result = await cartModel.findByIdAndDelete(cartId)
			return result
		} catch (error) {
			throw new Error(error)
		}
	}

	async addSingleProductToCart(cartId, product) {
		const myProduct = {
			product: product._id,
			quantity: 1,
		}

		try {
			const cart = await cartModel.findById(cartId)
			const productIndex = cart.products.findIndex(product => product.product.toString() === myProduct.product)

			if (productIndex === -1) {
				cart.products.push(myProduct);
				const savedCart = await cart.save()
				return savedCart
			} else {
				cart.products[productIndex].quantity++;
				const savedCart = await cart.save()
				return savedCart
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async deleteProduct(cartId, productId) {
		try {
			const newCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { product: productId } } })
			return newCart
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateProduct(cartId, productId, quantity) {
		try {
			await cartModel.updateOne({ _id: cartId, 'products.product': productId }, { $inc: { 'products.$.quantity': quantity } })
		} catch (error) {
			throw new Error(error)
		}
	}

	async deleteAllProducts(cartId) {
		try {
			await cartModel.updateOne({ _id: cartId }, { $set: { products: [] } })
		} catch (error) {
			throw new Error(error)
		}
	}

	async findById(cartId) {
		try {
			const cart = await cartModel.findById(cartId).populate('products.product')
			return cart
		} catch (error) {
			throw new Error(error)
		}
	}

	async purchase(cartId) {
		const cart = await cartModel.findById(cartId);
		

		
	}
}

class ProductManager {
	async read(page, limit, category, status, sort) {
		let options = {
			page: page || 1,
			limit: limit || 10
		}
		try {
			if (category) {
				const products = await productModel.paginate({ category: category }, options)
				return products
			}

			if (status) {
				const products = await productModel.paginate({ status: status }, options)
				return products
			}

			if (sort) {
				if (sort === 'asc') {
					options.sort = { price: 1 }

					const products = await productModel.paginate({}, options)
					return products
				}
				if (sort === 'desc') {
					options.sort = { price: -1 }
					const products = await productModel.paginate({}, options)
					return products
				}
			}

			const products = await productModel.paginate({}, options)
			return products
		} catch (error) {
			throw new Error(error)
		}
	}

	async create(product) {
		try {
			const newProduct = await productModel.create(product)
			await newProduct.save()
			return newProduct
		} catch (error) {
			throw new Error(error)
		}
	}

	async delete(productId) {
		try {
			const result = await productModel.findByIdAndDelete(productId)
			return result
		} catch (error) {
			throw new Error(error)
		}
	}

	async update(productId, product) {
		try {
			const result = await productModel.findByIdAndUpdate(productId, product)
			return result

		} catch (error) {
			throw new Error(error)
		}
	}

	async findProductById (productId) {
		try {
			return await productModel.findById(productId)
		} catch (error) {
			throw new Error(error)
		}
	}

}

module.exports = {
	MongoCartDao: CartManager,
	MongoProductDao: ProductManager
}