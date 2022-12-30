const fsPromises = require('fs').promises

class ProductManager {
    static id = 0;
    constructor(title, description, price, thumbnail, stock, path) {
        this.products = []
        this.code = ProductManager.id++;
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
        this.path = path
    }
    async #readFileProducts() {
        // lee el archivo y convierte el los datos en objs. Javascript
        try {
            const content = await fsPromises.readFile('DB/products.json', 'utf-8')
            const contentParse = JSON.parse(content);
            return contentParse
        } catch (error) {
            console.error('Error: no se logro leer el archivo')
            throw new Error(error)
        }
    }
    async getProducts() {
        //permite que veamos los productos en el documento
        const fileContent = await this.#readFileProducts()
        try {
            if (fileContent.length === 0) console.log('no se encontraron productos en el archivo')
            return fileContent
        } catch (error) {
            console.error('Error: no se encontraron productos en el archivo')
            throw new Error(error)
        }
    }
    async writeFileProducts(data) {
        try {
            await fsPromises.writeFile('DB/products.json', JSON.stringify(data))
            console.log('productos escritos con exito')
        } catch (error) {
            throw new Error(error)
        }
    }
    async addProduct(product) {
        const fileContent = await this.#readFileProducts()
        let codeUsed = fileContent.some(item => item.code === product.code)

        try {
            // agregar un producto
            if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock && !codeUsed) {
                fileContent.push({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                })
                console.log(`Producto ${product.title} agregado`)
                await this.writeFileProducts(fileContent)

            } else {
                console.error(`Error: Code repetido. El code ${product.code} ya esta en uso`)
            }
        } catch (error) {
            console.error('Error: No se pudo agregar el producto')
            throw new Error(error)
        }

    }
    async getProductById(id) {
        const fileContent = await this.#readFileProducts()
        // retornar el producto que cuente con este id
        let productFound = fileContent.find(prod => prod.code === id)
        try {
            if (productFound) {
                console.log(`producto con id: ${id} es...`, productFound)
                return productFound
            } else {
                console.error(`Error: no se encontro un producto con el id ${id}`)
            }
        } catch (error) {
            console.error(`Error: no se encontro un producto con el id ${id}`)
            throw new Error(error)
        }
    }
    async deleteProduct(id) {
        let fileContent = await this.#readFileProducts()
        let productFound = fileContent.find((product) => product.code === id)
        if (!productFound) {
            console.log(`no se encontro el producto con el id: ${id}`)
            return
        }
        try {
            let newProductList = fileContent.filter((product) => product.code !== id);
            await this.writeFileProducts(newProductList)
            console.log(`producto con el ${id} eliminado con exito`)
        } catch (error) {
            console.error(`Error: no se ha podido eliminar el producto con id ${id}`)
            throw new Error(error)
        }
    }
    async updateFile(id, obj) {
        const fileContent = await this.#readFileProducts()
        try {
            fileContent.map((product) => {
                if (product.code === id) {
                    product.title = obj.title;
                    product.description = obj.description;
                    product.price = obj.price;
                    product.thumbnail = obj.thumbnail;
                    product.code = id;
                    product.stock = obj.stock;
                }
                this.writeFileProducts(fileContent)
            })
        } catch (error) {
            console.error(`Error: producto con el ${id} actualizado con exito`)
            throw new Error(error)
        }
    }
}



const gestionProd = new ProductManager()

// Creación Productos
const naranja = new ProductManager('naranja', 'agria y muy dulce', 140, 'https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056_960_720.jpg', 23)
const banana = new ProductManager('banana', 'muy dulce', 200, 'https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_960_720.jpg', 30)
const limon = new ProductManager('limón', 'muy agrio y jugoso', 190, 'https://cdn.pixabay.com/photo/2015/10/13/15/16/lemons-986304__340.jpg', 19)

// TEST

// Agregar Productos

// gestionProd.addProduct(banana)
// gestionProd.addProduct(naranja)
// gestionProd.addProduct(limon)

// Borrar Productos

// gestionProd.deleteProduct(3)
// gestionProd.deleteProduct(2)
// gestionProd.deleteProduct(1)

module.exports = {
    gestionProd
}