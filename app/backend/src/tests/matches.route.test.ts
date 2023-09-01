import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import MatcheModel from '../database/models/MatcheModel';
import mockMatches from './mocks/matches.mock';
import mockUser from './mocks/user.mock';

const {
  matchesMockFindAll,
  matchesMockFindAllTrues,
  matchesMockFindAllFalses,
  matcheMockUpdateStatus,
  matcheMockUpdateGoals,
  matcheMockCreate,
} = mockMatches;
const { validUser, returnValidUser } = mockUser;

chai.use(chaiHttp);

const { expect } = chai;

async function getToken() {
  sinon.stub(UserModel, 'findOne').resolves(returnValidUser as any);

  const { body } = await chai.request(app).post('/login')
  .send({ email: validUser.email, password: validUser.password });

  return `token ${body.token}`;
}

describe('result Matches test:', () => {
  it('Verifica se é possivel retorna todos as partidas', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves(matchesMockFindAll as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMockFindAll);
  });

  it('Verifica se é possivel filtrar por partidas em andamento', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves(matchesMockFindAllTrues as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMockFindAllTrues);
  });

  it('Verifica se é possivel filtrar por partidas finalizadas', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves(matchesMockFindAllFalses as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMockFindAllFalses);
  });

  it('Verifica se é possivel finalizar uma partida - A validção de token é necessario -', async () => {
    sinon.stub(MatcheModel, 'update').resolves(matcheMockUpdateStatus as any);
    
    const token = await getToken()
    const { id, inProgress, ...MatcheBody } = matcheMockUpdateStatus;

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
    .send(MatcheBody)
    .set('authorization', token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  afterEach(sinon.restore);
});

describe('insert Matches test:', () => {
  it('Verifica se é possivel atualizar uma partida - A validção de token é necessario -', async () => {
    sinon.stub(MatcheModel, 'update').resolves(undefined);
    sinon.stub(MatcheModel, 'findByPk').resolves(matcheMockUpdateGoals as any);
    
    const token = await getToken()
    const { id, inProgress, homeTeamId, awayTeamId, ...MatcheBody } = matcheMockUpdateGoals;

    const { status, body } = await chai.request(app).patch('/matches/1')
    .send(MatcheBody)
    .set('authorization', token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matcheMockUpdateGoals);
  });

  it('Verifica se é possivel cadastrar uma nova partida - A validção de token é necessario -', async () => {
    sinon.stub(MatcheModel, 'create').resolves({ dataValues: matcheMockCreate } as any);
    
    const token = await getToken()
    const { id, inProgress, ...mockMatcheBody } = matcheMockCreate;

    const { status, body } = await chai.request(app).post('/matches')
    .send(mockMatcheBody)
    .set('authorization', token);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matcheMockCreate);
  });

  it('Verifica se não é possivel cadastrar uma nova partida com times iguais - A validção de token é necessario -', async () => {
    sinon.stub(MatcheModel, 'create').resolves(undefined);
    
    const token = await getToken()
    const { id, inProgress, awayTeamId, homeTeamId, ...mockMatcheBody } = matcheMockCreate;

    const { status, body } = await chai.request(app).post('/matches')
    .send({...mockMatcheBody, awayTeamId: 1, homeTeamId: 1})
    .set('authorization', token);

    expect(status).to.equal(422);
    expect(body).to.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it('Verifica se não é possivel cadastrar uma nova partida com times inexistentes - A validção de token é necessario -', async () => {
    sinon.stub(MatcheModel, 'create').resolves(undefined);
    sinon.stub(MatcheModel, 'findByPk').resolves(null);

    const token = await getToken()
    const { id, inProgress, ...mockMatcheBody } = matcheMockCreate;

    const { status, body } = await chai.request(app).post('/matches')
    .send(mockMatcheBody)
    .set('authorization', token);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });

  afterEach(sinon.restore);
})