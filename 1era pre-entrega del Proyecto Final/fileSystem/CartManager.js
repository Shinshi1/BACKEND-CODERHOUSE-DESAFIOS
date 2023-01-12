const fsPromises = require('fs').promises

class CartManager {
    static id = 0;
    constructor() {
        this.id = CartManager.id++;
    }

    async #readFileCarts() {

    }
    async getCarts(){

    }
    async writeFileCarts(data) {
        
    }
}