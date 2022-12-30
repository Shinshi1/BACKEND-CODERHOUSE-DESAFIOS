const { read } = require('fs');
const fsPromises = require('fs/promises')

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
            console.error('no se logro leer el archivo')
            throw new Error(error)
        }
    }
    async getProducts() {
        //permite que veamos los productos en el documento
        const fileContent = await this.#readFileProducts()
        try {
            if (fileContent.lenght === 0) console.log('no se encontraron productos en el archivo')
            else console.log(fileContent)
        } catch (error) {
            console.error('no se encontraron productos en el archivo')
            throw new Error(error)
        }
    }
    async writeFileProducts(data) {
        try {
            fsPromises.writeFile('DB/products.json', JSON.stringify(data))
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
                this.writeFileProducts(fileContent)

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
                console.error(`no se encontro un producto con el id ${id}`)
            }
        } catch (error) {
            console.error(`no se encontro un producto con el id ${id}`)
            throw new Error(error)
        }
    }
    async deleteProduct(id) {
        const fileContent = await this.#readFileProducts()
        let newProductList = []
        try {
            fileContent.map((product) => {
                if (product.code !== id) {
                    newProductList.push(product)
                    console.log(`producto con el ${id} eliminado con exito`)
                    this.writeFileProducts(newProductList)
                } 
            })
        } catch (error) {
            console.error(`no se ha podido eliminar el producto con id ${id}`)
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
            console.error(`producto con el ${id} actualizado con exito`)
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
gestionProd.addProduct(naranja)
gestionProd.addProduct(banana)
gestionProd.addProduct(limon)

// const testAsync = async () => {
//     gestionProd.writeFileProducts()
// }
// testAsync()
gestionProd.getProducts()

gestionProd.updateFile(2, {title: 'durazno', description: 'redonda dulce y peloso', price: 751, thumbnail: 'https://cdn.pixabay.com/photo/2015/12/03/13/51/peach-1074997__340.jpg', code: 4, stock: 21})

module.exports = {
    gestionProd
}