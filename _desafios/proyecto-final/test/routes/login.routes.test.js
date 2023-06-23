const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../../src/app');
const requester = supertest.agent(app);

describe('sessions router test cases', () => {
  
  it('[GET] /login - Should get a login view', async () => {
    const response = await requester.get('/login');
    expect(response.statusCode).to.eql(200);
    expect(response.text).to.include('<title>Login</title>');
  })
  

  it('[POST] /login - Should get a user in session', async () => {
    const response = await requester.post('/login').send({ username: 'erwin@mail.com', password: '1234' });
    expect(response.body.status).to.be.eql('success');
    expect(response.body.payload._id).to.exist;
  })

  it('[GET] /login/faillogin - Should get fail response on login', async () => {
    const responseLogin = await requester.post('/login').send({ username: 'wrongUser', password: 'wrongPassword' });
    const response = await requester.get('/login/faillogin')
    expect(responseLogin.statusCode).to.be.eql(302);
    expect(response.body.error).to.be.eql('Failed Login');

    // expect(response.statusCode)
    
    // expect(response.body.message).to.be.eql('User found');
    // expect(response.body.user.email).to.be.eql('erwin@mail.com');
  })
  /*
  it('[GET] /login/github - Should get a user in session', async () => {
    const response = await requester.get('/login/github');
    // expect(response.body.message).to.be.eql('User found');
    // expect(response.body.user.email).to.be.eql('erwin@mail.com');
  })
  it('[GET] /login/githubcallback - Should get a user in session', async () => {
    const response = await requester.get('/login/githubcallback');
    // expect(response.body.message).to.be.eql('User found');
    // expect(response.body.user.email).to.be.eql('erwin@mail.com');
  })
  */
})