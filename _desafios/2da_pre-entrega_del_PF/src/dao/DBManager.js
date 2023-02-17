// import models
const { productModel } = require('./models/products.model.js')
const { cartModel } = require('./models/carts.model.js')


class CartManager {
	async read() {
		try {
			const carts = await cartModel.find();
			return carts
		} catch (error) {
			throw new Error(error)
		}
	}

	async create() {
		try {
			const newCart = new cartModel()
			await newCart.save();
			return newCart
		} catch (error) {
			console.log('hola')
			throw new Error(error)
		}
	}

	async delete(cartId) {
		try {
			const result = await AndDelete(cartId)
			return result
		} catch (error) {
			throw new Error(error)
		}
	}

	async update(cartId, product) {
		const myProduct = {
			_id: product._id,
			quantity: 1,
		}

		try {
			const resultArray = await cartModel.find({ _id: cartId })
			const result = resultArray[0]

			if (result.products.length === 0) {
				// if !productExist
				result.products.push(myProduct)
				const savedResult = await result.save()
				return savedResult
			}
			const index = result.products.findIndex((product) => product._id === myProduct._id)
			if (index === -1) {
				// if !productExist
				result.products.push(myProduct)
				const savedResult = await result.save()
				return savedResult
			} else {
				// if productExist
				const updatedResult = await cartModel.findOneAndUpdate({ _id: cartId, "products._id": myProduct._id }, { $inc: { "products.$.quantity": 1 } }, { new: true })
				return updatedResult
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async deleteProduct(cartId, productId) {
		try {
			const newCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } })
			return newCart
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateProduct(cartId, productId, quantity) {
		try {
			await cartModel.updateOne({ id: cartId, 'products._id': productId }, { $inc: { 'products.$.quantity': quantity } })
		} catch (error) {
			throw new Error(error)
		}
	}

	async deleteAllProducts(cartId) {
		try {
			await cartModel.updateOne({ id: cartId }, { $set: { products: [] } })
		} catch (error) {
			throw new Error(error)
		}
	}

	async findByID(cartId) {
		try {
			const cart = await cartModel.findById(cartId)
			// console.log('cart', JSON.stringify(cart, null, '\t') )
			return cart
		} catch (error) {
			throw new Error(error)
		}
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
					console.log(options)

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



}

module.exports = {
	CartManager,
	ProductManager
}

// const deleteInterest = (req, res) => {
// 	const userId = req.params.userId;
// 	const interestId = req.params.interestId;

// 	User.updateOne({ _id: userId }, { $pull: { interests: { _id: interestId } } })
// 		.then(() => {
// 			res.status(200).send(`Interest ${interestId} deleted from user ${userId}`);
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			res.status(500).send(error);
// 		});
// };