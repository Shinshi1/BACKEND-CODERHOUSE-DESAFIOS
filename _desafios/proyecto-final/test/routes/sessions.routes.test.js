const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../../src/app');
const requester = supertest.agent(app);

describe('sessions router test cases', () => {
  before(async () => {
    // incio de sesión
    await requester.post('/login').send({ username: 'erwin@mail.com', password: '1234' });
  })

  it('[GET] /sessions - Should get a user in session', async () => {
    const response = await requester.get('/sessions');
    expect(response.body.message).to.be.eql('User found');
    expect(response.body.user.email).to.be.eql('erwin@mail.com');
  })
})