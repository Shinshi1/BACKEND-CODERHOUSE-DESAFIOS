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
}

const gestionCart = new CartManager()

module.exports = {
    gestionCart
}