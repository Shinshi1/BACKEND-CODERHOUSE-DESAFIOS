const express = require('express');
const { gestionProd } = require('./clases/ProductManager');
const app = express();
const port = 8080;

app.get('/products', (req, res) => {
    const products = gestionProd.readFileProducts();
    const limit = req.query.limit;
    let respuesta = products
    // si hay query de limit, limitar la cantidad de productos que voy a devolver con array.prototype.slice
    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit)
    }
    res.send(respuesta);
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const products = gestionProd.readFileProducts();
    const product = products.find((p) => p.code === Number(pid));
    res.send(product);
});

app.listen(port, () => {
    console.log('servidor levantado en el puerto', port);
});