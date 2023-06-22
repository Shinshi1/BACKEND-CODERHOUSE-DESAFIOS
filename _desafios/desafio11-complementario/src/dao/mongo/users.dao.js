const userModel = require('./models/users.model.js');

class MongoUserDao {
  async findById(userId) {
    return await userModel.findById(userId);
  };

  async findByEmail(email) {
    return await userModel.findOne({ email });
  };

  async updatePassword(email, newPassword) {
    return await userModel.findOneAndUpdate({ email }, { password: newPassword })
  };

  async createUser(newUser) {
    return await userModel.create(newUser);
  };

  async findByEmailForPasswordReset(email) {
    return await userModel.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password: 1 });
  };

  async getAllUsers() {
    return await userModel.find({});
  };

  async updateUser(userId, updateFields) {
    try {
      const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: updateFields }, { new: true }) // `{new:true}` devuelve el usuario actualizado en lugar del anterior

      if (!updatedUser) throw new Error('Usuario no encontrado')

      return updatedUser;
    } catch (error) {
      throw new Error('Error al actualizar el usuario')
    }
  }
}

module.exports = MongoUserDao;