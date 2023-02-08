// --- imports packages ---
const express = require('express')
const app = express()
const cors = require('cors')
// imports routes
const {cartsRouter} = require('./routes/cartsRouter')
const {productsRouter} = require('./routes/productsRouter')

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on http://localhost:${port}`))