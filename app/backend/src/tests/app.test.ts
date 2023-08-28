const chai = require('chai');
const chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  it('Verifica se a aplicação esta rodando', async function () {
    const response = await chai.request(app).get('/');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ ok: true });
  });
});