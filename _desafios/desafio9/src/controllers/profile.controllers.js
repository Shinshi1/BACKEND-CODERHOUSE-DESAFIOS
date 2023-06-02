const { usersService, ticketService } = require('../repositories/index.js')

const getProfileInfo = async (req, res) => {
  const userId = req.session.user?._id;
  try {
    if (userId) {
      // cookie cartId
      const user = await usersService.getUserById(userId);
      let cartId = user.cart.toString()
      if (cartId) {
        res.cookie('cartId', { cartId }, { maxAge: 86400000, httpOnly: false })
      }
      const userDTO = await usersService.getUserByIdDTO(userId)
      req.logger.info('User profile successfully obtained')
      res.render('profile', { title: 'Profile', stylesheet: 'profile', user: userDTO })
    } else {
      req.logger.warning('Unauthorized - Session expired')
      res.status(401).json({error: 'Unauthorized - Session expired'})
    }

  } catch (error) {
    req.logger.error(`Error obtaining user profile: ${error.message}`)
    res.status(500).json({ message: error.message });

  }
}

const userLogout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (!err) {
        req.logger.info('Successful logout')
        res.redirect('/login')
      }
      else {
        req.logger.error(`Logout error: ${err}`)
        res.send({ status: `logout ERROR`, body: err })
      }
    })

  } catch (error) {
    req.logger.error(`Error logging out: ${error.message}`);
    res.status(500).json({ error: error.message })
  }
}

const getTickets = async (req, res) => {
  // orders
  const userMail = req.session.user?.email
  try {
    if (userMail) {
      // orders
      const userTickets = await ticketService.getTickets(userMail)
      if (userTickets) {
        req.logger.info('Successfully obtained tickets');
        res.status(200).send({ response: 'Tickets Disponibles', userTickets })
      } else {
        req.logger.warning('No tickets available')
        res.status(404).json({ message: 'No hay tickets disponibles' })
      }
    } else {
      res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
    }
  } catch (error) {
    req.logger.error(`Error when obtaining tickets: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProfileInfo,
  userLogout,
  getTickets
}