const { gestionProd } = require('./fileSystem/ProductManager')

// Eventos Websockets]
const sockets = (socketServer) => {
    let addedProducts = []

    socketServer.on('connection', async(socket) => {
        socket.on('productReceived', async (data) => {
            // data => producto recibido del frontend
            await gestionProd.addProduct(data)
            addedProducts.push(data)
            socketServer.emit('addedProducts', addedProducts)
        })
    
        // code de producto a eliminar - eliminamos del products.json
        socket.on('productDelete', async (data) => {
            const products = await gestionProd.getProducts()
            const productDelete = products.find(p => p.code === data)
            if (!Boolean(productDelete)) {
                console.error('Error: product not found')
                return
            } 
            await gestionProd.deleteProduct(productDelete.id)
        })
    })
}

module.exports = {
    sockets
}