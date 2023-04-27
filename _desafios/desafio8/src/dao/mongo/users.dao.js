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
}

module.exports = MongoUserDao;