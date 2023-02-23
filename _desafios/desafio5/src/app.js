// --- imports packages ---
// express
const express = require('express')
const app = express()
// express-handlebars
const handlebars = require('express-handlebars')
// socket.io & socketEvents & new-messages
const { Server } = require('socket.io')
const { sockets, messages } = require('./sockets')
// cors
const cors = require('cors')
// mongoose
const mongoose = require('mongoose')
// dotenv
require('dotenv').config()

// imports routes
const { cartsRouter } = require('./routes/carts.routes.js')
const { productsRouter } = require('./routes/products.routes.js')
const { chatRouter } = require('./routes/chat.routes.js')
// products
const { gestionProd } = require('./dao/fileSystem/ProductManager')
const { messageRoute } = require('./routes/message.routes')

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

// enviroment variables
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 8080;

// port
const httpServer = app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))

httpServer.on('error', (error) => console.log(`Error en el servidor ${error}`))

// socket
const socketServer = new Server(httpServer)

// --- middleware ---
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// view engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
// static archives
app.use(express.static('public'))

// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
app.use('/messages', messageRoute)

// socketMessage = propaga los msj tanto localmente como desde mongoDB
app.post('/chat', (req, res) => {
    const { message } = req.body;
    socketServer.emit('message', message);

    res.send('ok');
});


app.get('/', async (req, res) => {
    res.status(200).render('home', { products: products })
})

app.get('/products', async (req, res) => {
    res.status(200).render('products', { stylesheet: 'products' })
})

app.get('/carts/:cid', async (req, res) => {
    res.status(200).render('carts', { stylesheet: 'carts' })
})

app.get('/realtimeproducts', async (req, res) => {
    const products = await gestionProd.getProducts()
    res.status(200).render('realtimeproducts', { products: products })
})

// Socket Events
sockets(socketServer)

// receiving messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Mongoose

const enviroment = async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.p8sktwl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,);
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.error(`Error: error al conectar a mongoDB... ${error}`)
        throw new Error(error)
    }
}


const isValidStartData = () => {
    return Boolean(DB_PASS && DB_USER)
};


isValidStartData && enviroment()

module.exports = {
    messages
}