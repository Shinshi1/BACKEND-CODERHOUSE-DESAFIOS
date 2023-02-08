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
			const result = await cartModel.findByIdAndDelete(cartId)
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
}


class ProductManager {
	async read() {
		try {
			const products = await productModel.find()
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