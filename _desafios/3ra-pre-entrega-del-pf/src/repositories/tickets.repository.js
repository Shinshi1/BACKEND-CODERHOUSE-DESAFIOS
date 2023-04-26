class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = async (totalAmount, purchaser) => {
    await this.dao.createTicket(totalAmount, purchaser)
  }
}

module.exports = TicketRepository;