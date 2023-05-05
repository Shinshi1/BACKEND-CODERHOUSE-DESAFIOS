const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, default: uuidv4 }, // debe autogenerase y ser unico
  purchase_datetime: { type: Date, default: Date.now }, //hora y fecha exacta de compra
  amount: { type: Number, required: true }, // total de la compra
  purchaser: { type: String, required: true }, //correo del usuario asociado al carrito
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

module.exports = ticketModel