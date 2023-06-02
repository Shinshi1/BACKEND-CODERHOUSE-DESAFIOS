const UserDTO = require('../dao/DTOs/user.dto.js')

class UserRepository {
  constructor(dao) {
    this.dao = dao
  };

  getUserById = async (userId) => {
    let result = await this.dao.findById(userId)
    return result;
  };

  getUserByEmail = async (email) => {
    let result = await this.dao.findByEmail(email);
    return result
  };

  updateUserPassword = async (email, newPassword) => {
    let result = await this.dao.updatePassword(email, newPassword)
    return result;
  };

  createUser = async (newUser) => {
    let result = await this.dao.createUser(newUser);
    return result;
  };

  resetPassword = async (email) => {
    let result = await this.dao.findByEmailForPasswordReset(email);
    return result;
  }

  getAllUsers = async () => {
    let result = await this.dao.getAllUsers();
    return result
  }

  getUserByIdDTO = async (userId) => {
    let result = await this.dao.findById(userId);
    return new UserDTO(result);
  }

  getUserByEmailDTOSubset = async (email, ...arraySubset) => {
    let result = await this.dao.findByEmail(email);
    const userDTO = UserDTO.createSubset(result, ...arraySubset);
    return userDTO
  }
}

module.exports = UserRepository