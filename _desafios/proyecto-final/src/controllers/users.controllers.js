const { usersService } = require('../repositories/index.js');

const changeRole = async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await usersService.getUserById(uid)
    const updateFields = {}

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    if (user.role === 'user') {
      updateFields.role = 'premium'
    } else if (user.role === 'premium') {
      updateFields.role = 'user'
    }
    const response = await usersService.updateUser(uid, updateFields)

    if (response) {
      res.status(200).json({ message: `${user.first_name} now has the ${updateFields.role} role` });
    } else {
      res.status(500).json({ error: `Error updating user's role` })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  changeRole,
}