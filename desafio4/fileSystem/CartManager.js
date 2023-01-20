// import File System
const fsPromises = require('fs').promises

class CartManager {
    static id = 0;
    constructor() {
        this.id = CartManager.id++;
    }

    async #readFileCarts() {
        try {
            const content = await fsPromises.readFile('DB/carts.json', 'utf-8')
            const contentParse = JSON.parse(content)
            return contentParse
        } catch (error) {
            console.error('Error: failed to read file')
            throw new Error(error)
        }
    }
    async getCarts() {
        const fileContent = await this.#readFileCarts()
        try {
            if (fileContent.length === 0) console.Error('Error: not carts found in file')
            return fileContent
        } catch (error) {
            console.error('Error: not carts found in file')
            throw new Error(error)
        }
    }
    async writeFileCarts(data) {
        try {
            await fsPromises.writeFile('DB/carts.json', JSON.stringify(data))
            console.log('carts written succesfully!')
        } catch (error) {
            console.error('Error: carts written failed')
            throw new Error(error)
        }
    }
    async addCart(cart) {
        const fileContent = await this.#readFileCarts();
        let newCart = {
            id: CartManager.id++,
            ...cart
        }
        let idUsed = await fileContent.some(c => c.id === newCart.id);
        // A pesar del reinicio del servidor el id siempre sera autoincrementable ↓
        try {
            if (idUsed) {
                let arrayCid = fileContent.map(cart => [cart.id]).flat();
                let cidMayor = Math.max(...arrayCid);
                newCart.id = cidMayor + 1;
                fileContent.push(newCart)
            } else {
                fileContent.push(newCart)
            }
            console.log('cart added');
            await this.writeFileCarts(fileContent);
        } catch (error) {
            console.error('Error: can not product added');
            throw new Error(error)
        }
    }
    async addToCart(cart, product) {
        const fileContent = await this.#readFileCarts()
        // agregar el producto al carrito
        try {
                let cartFoundIndex = fileContent.findIndex((c) => c.id === cart.id)
                let productFoundIndex = fileContent[cartFoundIndex].products.findIndex((p) => p.id === product.id)
                let productNotExist = true
                if(fileContent[cartFoundIndex].products[productFoundIndex]) {
                    fileContent[cartFoundIndex].products[productFoundIndex].quantity = fileContent[cartFoundIndex].products[productFoundIndex].quantity + 1
                    this.writeFileCarts(fileContent) // ver si puedo poner un solo writeFile al final de los if
                    console.log('se aumenta el valor quantity')
                } else if(productNotExist) {
                    fileContent[cartFoundIndex].products.push(product)
                    this.writeFileCarts(fileContent)
                    console.log('product added to cart')
                    console.log('sea agreaga un product al array')   
                }
                console.log('afuera de los if')

            } catch (error) {
                console.error(`Error: product not added to cart with ${cart.id}`)
                throw new Error(error)
            }
    }
    async getCartById(id) {
        const fileContent = await this.#readFileCarts()
        // retornar el producto que cuente con este id
        let cartFound = fileContent.find(cart => cart.id === id)
        try {
            if (cartFound) {
                console.log(`cart with id: ${id} found`)
                return cartFound
            } else {
                console.error(`Error: not cart found with id ${id}`)
            }
        } catch (error) {
            console.error(`Error: not cart found with id ${id}`)
            throw new Error(error)
        }
    }
}

const gestionCart = new CartManager()

module.exports = {
    gestionCart
}