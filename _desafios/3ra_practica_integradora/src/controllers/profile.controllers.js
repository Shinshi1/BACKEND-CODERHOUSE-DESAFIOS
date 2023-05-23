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
      res.render('profile', { title: 'Profile', stylesheet: 'profile', user: userDTO })
    } else {
      res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
    }

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

const userLogout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (!err) {
        res.redirect('/login')
      }
      else res.send({ status: `logout ERROR`, body: err })
    })

  } catch (error) {
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
        res.status(200).send({ response: 'Tickets Disponibles', userTickets })
      } else {
        res.status(404).json({ message: 'No hay tickets disponibles' })
      }
    } else {
      res.send('Sesión Expirada, porfavor vuelva a Iniciar Sesión')
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProfileInfo,
  userLogout,
  getTickets
}