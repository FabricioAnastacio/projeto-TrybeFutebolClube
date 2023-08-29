import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import mock from './mocks/teams.mock';

const { mockTeams } = mock;

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test:', () => {
  it('Verifica se é possivel retorna todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(mockTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeams);
  });
});