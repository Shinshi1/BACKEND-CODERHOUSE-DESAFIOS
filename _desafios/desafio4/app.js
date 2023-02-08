// --- imports packages ---
const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const app = express()
const cors = require('cors')
const {sockets} = require('./sockets')


// imports routes
const { cartsRouter } = require('./routes/cartsRouter')
const { productsRouter } = require('./routes/productsRouter')
// products
const { gestionProd } = require('./fileSystem/ProductManager')

let products = []
const fetchProducts = async () => {
    try {
        products = await gestionProd.getProducts()
    } catch (error) {
        console.error('Error: not product found')
        throw new Error(error)
    }
}
fetchProducts()

// port
const port = process.env.PORT || 8080;
const httpServer = app.listen(port, () => console.log(`listening on http://localhost:${port}`))
// socket
const socketServer = new Server(httpServer)

// --- middleware ---
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// view engine
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
// static archives
app.use(express.static(__dirname + '/public'))

// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.get('/', async (req, res) => {
    res.status(200).render('home', { products: products })
})

app.get('/realtimeproducts', async (req, res) => {
    const products = await gestionProd.getProducts()
    res.status(200).render('realtimeproducts', { products: products })
})

sockets(socketServer)