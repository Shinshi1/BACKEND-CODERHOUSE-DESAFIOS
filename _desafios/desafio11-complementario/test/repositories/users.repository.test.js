const { expect } = require('chai');
const { usersService } = require('../../src/repositories/index');
const { dropUsers } = require('../setup.test');
const userModel = require('../../src/dao/mongo/models/users.model');

describe('test cases of the user services.', () => {
  before(async () => {
    // NOTA: Si borro la colleción de "users", el test de cart no funcionara. por ende debería crear un usuario en el before o ver en que parte de el test de `cart.respository.test.js`

    // await dropUsers()
  })

  after(async () => {
    await userModel.findOneAndDelete({ email: 'eren@mail.com', })
    await userModel.findOneAndDelete({ email: 'erenjaeager@mail.com', })
  })

  let uid
  let userEmail

  it('The service should return a list with all registered users', async () => {
    const result = await usersService.getAllUsers();
    expect(Array.isArray(result)).to.be.eqls(true);
  })

  it('The service should create a user in the database.', async () => {
    const user = {
      first_name: 'Eren',
      last_name: 'Jaeger',
      email: 'eren@mail.com',
      password: '1234',
      age: '19',
      role: 'admin'
    }
    let result = await usersService.createUser(user);
    expect(result._id).to.exist
    uid = result._id
    userEmail = result.email
  })

  it('The service should get a user by id in the database.', async () => {
    let result = await usersService.getUserById(uid);
    expect(result._id).to.exist
  })

  it('The service should get a user by email in the database.', async () => {
    let result = await usersService.getUserByEmail(userEmail);
    expect(result.email).to.exist;
  })
  it("The service should find a user by their email in the database, obtaining only the data necessary to reset their password.", async () => {
    let result = await usersService.resetPassword(userEmail);
    expect(result).to.exist;
  })
  it("The service should update the user's password in the database.", async () => {
    let user = await usersService.resetPassword(userEmail);
    let result = await usersService.updateUserPassword(user.email, '12345')
    let userUpdated = await usersService.getUserByEmail(userEmail)
    expect(result.password).to.not.eql(userUpdated.password)
    expect(userUpdated.password).to.be.eql('12345');
  })
  it('The service should get a user by id in the database, obtaining only the data necessary.', async () => {
    let result = await usersService.getUserByIdDTO(uid);
    expect(result.first_name).to.exist;
    expect(result.last_name).to.exist;
    expect(result.age).to.exist;
    expect(result.cart).to.exist;
    expect(result.email).to.exist;
    expect(result.role).to.exist;
    expect(result._id).to.exist;
  })
  it('The service should get a  user by email in the database, obtaining only the data requested.', async () => {
    let result = await usersService.getUserByEmailDTOSubset(userEmail, ['first_name', 'last_name', 'role']);
    expect(result.first_name).to.exist
    expect(result.last_name).to.exist
    expect(result.role).to.exist
    expect(result.age).to.not.exist
  })
  it('The service should update a user in the database.', async () => {
    const updateFields = {
      email: 'erenjaeager@mail.com',
      age: 18
    }
    let userBefore = await usersService.getUserById(uid)
    let result = await usersService.updateUser(uid, updateFields)
    expect(result.email).to.not.eql(userBefore.email)
    expect(result.age).to.not.eql(userBefore.age)
    expect(result.age).to.eql(18)
    expect(result.email).to.eql('erenjaeager@mail.com')
  })
})