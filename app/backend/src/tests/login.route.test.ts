import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import mockLogin from './mocks/login.mock';
import mockUser from './mocks/user.mock';
import JWT from '../utils/JWT';

const { tokenValid } = mockLogin;
const { validUser, returnValidUser } = mockUser;

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test:', () => {
  it('Verifica se não é possivel fazer login sem email', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
    .send({ password: '1234567' });

    expect(status).to.equal(400);
    expect(body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('Verifica se não é possivel fazer login sem password', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
    .send({ email: 'test@tentando.com' });

    expect(status).to.equal(400);
    expect(body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('Verifica se não é possivel fazer login com email não cadastrado', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
    .send({ email: 'test@test.com', password: validUser.password });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Verifica se não é possivel fazer login, email com formato incorreto', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
    .send({ email: 'teststcom', password: validUser.password });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Verifica se não é possivel fazer login com password incorreto ou menor que 6 caracteres', async () => {
    sinon.stub(UserModel, 'findOne').resolves(returnValidUser as any);

    const { status, body } = await chai.request(app).post('/login')
    .send({ email: validUser.email, password: '12345' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Verifica se é possivel fazer login com password e email', async () => {
    sinon.stub(UserModel, 'findOne').resolves(returnValidUser as any);
    sinon.stub(JWT, 'createToken').returns(tokenValid.token as any);

    const { status, body } = await chai.request(app).post('/login')
    .send({ email: validUser.email, password: validUser.password });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(tokenValid);
  });

  afterEach(sinon.restore);
});

describe('Login/role :', () => {
  it('Verifica se é possivel acessar a rota sem token', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/login/role');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' }); 
  });

  it('Verifica se é possivel acessar a rota com token invalido', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/login/role')
    .set('authorization', 'asghg3uygasdf.asds');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' }); 
  });

  it('Verifica se é possivel acessar a rota com token valido e retorna a "role"', async () => {
    sinon.stub(UserModel, 'findOne').resolves(returnValidUser as any);
    sinon.stub(JWT, 'getPayload').returns('');

    const { status, body } = await chai.request(app).get('/login/role')
    .send({ payload: { email: validUser.email } })
    .set('authorization', 'token.magia');;

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: returnValidUser.role }); 
  });

  afterEach(sinon.restore);
});