const { expect } = require('chai');
const supertest = require('supertest');
// const { cartsRouter } = require('../../src/routes/carts.routes.js')
// const { dropUsers } = require('../setup.test.js');
const { app } = require('../../src/app');
const requester = supertest.agent(app);
