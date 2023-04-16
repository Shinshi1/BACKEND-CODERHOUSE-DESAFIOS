const userModel = require('./models/users.model.js');

class MongoUserDao {
  async findById(userId, showDataProfile) {
    if (showDataProfile) {
      return await userModel.findById(userId).select('first_name last_name age').lean();
    };
    return await userModel.findById(userId);
  };

  async findByEmail(email, showDataProfile) {
    if (showDataProfile) {
      return await userModel.findOne({ email }).select('-_id first_name last_name').lean(); //-`_id` - para no incluir el id del usuario
    };
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

  async updatePasswordEmail(email, newPassword) {
    return await userModel.findOneAndUpdate({ email: email }, { password: newPassword });
  };

  async getAllUsers() {
    return await userModel.find({});
  };
}

const mongoUserDao = new MongoUserDao();

module.exports = mongoUserDao;