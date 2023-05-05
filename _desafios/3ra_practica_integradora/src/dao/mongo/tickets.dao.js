const ticketModel = require('./models/ticket.model.js');

class MongoTicketDao {
  async createTicket(totalAmount, purchaser) {
    const ticket = new ticketModel({
      amount: totalAmount,
      purchaser: purchaser
    });
    await ticket.save();
  };

 
};

module.exports = MongoTicketDao;