const { gestionProd } = require('./dao/fileSystem/ProductManager')
const { messageModel } = require('./dao/models/messages.model')
// new-messages
const messages = []

// Eventos Websockets]
const sockets = (socketServer) => {
    let addedProducts = []

    socketServer.on('connection', async (socket) => {
        socket.on('productReceived', async (data) => {
            // data => producto recibido del frontend
            await gestionProd.addProduct(data)
            addedProducts.push(data)
            socketServer.emit('addedProducts', addedProducts)
        });

        // code de producto a eliminar - eliminamos del products.json
        socket.on('productDelete', async (data) => {
            const products = await gestionProd.getProducts()
            const productDelete = products.find(p => p.code === data)
            if (!Boolean(productDelete)) {
                console.error('Error: product not found')
                return
            }
            await gestionProd.deleteProduct(productDelete.id)
        });

        // new-user y notificación a los demas users
        socket.on('new-user', (data) => {
            socket.user = data.user;
            socket.id = data.id;
            socketServer.emit('new-user-connected', {
                user: socket.user,
                id: socket.id,
            });
        });
        // add-messages, emit old-messages all users, create message at DB
        socket.on('message', (data) => {
            messages.push(data);
            socketServer.emit('messageLogs', messages)
            messageModel.create(data)
        });
    });
};

module.exports = {
    sockets,
    messages
}