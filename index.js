
const fs = require('fs')

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
    writeFileProducts() {
        fs.writeFile('products.json', JSON.stringify(this.products),
            (err) => {
                if (err) throw err;
                console.log('agregado con exito')
            }
        )
    }
    readFileProducts() {
        fs.readFile('products.json', 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(console.log(JSON.parse(data)))
        })
    }
    addProduct(product) {
        let codeUsed = this.products.some(item => item.code === product.code)

        // agregar un producto
        if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock && !codeUsed) {
            this.products.push({
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
            })
            console.log(`Producto ${product.title} agregado`)
            // console.log('Productos...', this.products)
        } else {
            console.error(`Error: Code repetido. El code ${product.code} ya esta en uso`)
        }
    }
    getProducts() {
        //retornar todos lo productos
        return this.products
    }
    getProductById(id) {
        // retornar el producto que cuente con este id
        let productFound = this.products.find(prod => prod.code === id)
        if (productFound) {
            return productFound
        } else {
            console.error(`no product found with id ${id}`)
        }
    }
    deleteProduct(id) {
        let arrayVacio = []
        this.products.map((product) => {
            if (product.code !== id) arrayVacio.push(product)


            fs.writeFile('products.json', JSON.stringify(arrayVacio),
                (err) => {
                    if (err) throw err;
                    console.log(`producto con el ${id} eliminado con exito`)
                })
        })
    }
    updateFile(id, obj) {
        this.products.map((product) => {
            if (product.code === id) {
                // [...product, obj]
            } 
        })
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
// Repito el objeto para simular error de Code repetido
console.log(gestionProd.addProduct(naranja))

// Busco un producto con un id existente y uno inexistente
// console.log(gestionProd.getProductById(1))
// console.log(gestionProd.getProductById(100))

// Hago uso de la funcion getProducts para ver cuantos productos tengo en el array products
// console.table(gestionProd.getProducts())

// gestionProd.writeFile()
// gestionProd.readFile()
// gestionProd.updateFile(1)
// gestionProd.readFileProducts()
gestionProd.updateFile(2)