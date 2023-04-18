const mongoose = require('mongoose');

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: String, // debe autogenerase y ser unico
  purchase_datetime: new Date(), //hora y fecha exacta de compra
  amount: Number, // total de la compra
  purchaser: String, //correo del usuario asociado al carrito
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

module.exports = ticketModel