class UserDTO {
  constructor({ first_name, last_name, age, cart }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.cart = cart
  }

  static createSubset(user, properties) {
    const subset = {};
    let userMongo = user._doc ? user._doc : user
    for (const property of properties) {
      if (userMongo.hasOwnProperty(property)) {
        subset[property] = user[property]
      }
    }
    return new UserDTO(subset);
  }
}

module.exports = UserDTO

// ejemplo de uso - permite ser más flixible con
// la infromación que se muestra
//  const userSubset = userDTO.createSubset(user, ['firstName', 'age']);