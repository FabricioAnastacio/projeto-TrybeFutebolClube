import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import mock from './mocks/teams.mock';

const { mockTeams, mockTeamID } = mock;

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test:', () => {
  it('Verifica se é possivel retorna todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(mockTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeams);
  });
  it('Verifica se é possivel retorna um time pelo id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(mockTeamID as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeamID);
  });
  it('Verifica se é retornado uma mensagen de erro caso o time não seja encontrado ', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/100');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({
      message: 'User not found',
    });
  });

  afterEach(sinon.restore);
});