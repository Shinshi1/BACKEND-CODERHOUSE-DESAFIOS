const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../../src/app');
const userModel = require('../../src/dao/mongo/models/users.model.js');
const requester = supertest.agent(app);

describe('sessions router test cases', () => {
  after(async () => {
    await userModel.findOneAndDelete({ email: 'jean@mail.com' })
  })

  it('[GET] / - Should get a view to sign up.', async () => {
    const response = await requester.get('/signup');
    expect(response.text).to.include('<title>Signup</title>');
    expect(response.statusCode).to.be.eql(200);
  })

  it('[POST] / - Should create a user', async () => {
    const response = await requester.post('/signup').send({
      first_name: 'Jean',
      last_name: 'Kirstein',
      email: 'jean@mail.com',
      password: '1234',
      age: 19,
    });
    expect(response.statusCode).to.be.eql(201);
    expect(response.body.message).to.be.eql('success')
    expect(response.body.data._id).to.exist
  })

  it('[GET] /fail - Should get fail response on sign up', async () => {
    const response = await requester.get('/signup/fail');
    expect(response.statusCode).to.be.eql(302);
    expect(response.text).to.be.eql('Failed');
  })
})