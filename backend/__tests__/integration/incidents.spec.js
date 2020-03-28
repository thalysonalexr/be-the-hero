import request from 'supertest';

import app from '../../src/app';
import conn from '../../src/database';

describe('INCIDENTS', () => {

  beforeEach(async () => {
    // await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it('should be able create a new incident by ONG', async () => {
    const { body: { id } } = await request(app)
      .post('/v1/ongs')
      .send({
        name: 'APAE',
        email: 'contato@apae.com.br',
        whatsapp: '67999999999',
        city: 'Sonora',
        uf: 'MS'
      })
      .type('form')
      .expect(201);

    const response = await request(app)
      .post('/v1/incidents')
      .set({ 'Authorization': id })
      .send({
        title: 'Title of incident',
        description: 'Description of incident',
        value: 25
      })
      .type('form')
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able list all incidents', async () => {
    const response = await request(app)
      .get('/v1/incidents')
      .expect(200);

    expect(response.body).toHaveProperty('incidents')
  });

  it('should be able delete incident by ID', async () => {
    const { body: { id } } = await request(app)
      .post('/v1/ongs')
      .send({
        name: 'APAE',
        email: 'contato@apae.com.br',
        whatsapp: '67999999999',
        city: 'Sonora',
        uf: 'MS'
      })
      .type('form')
      .expect(201);

    const incident = await request(app)
      .post('/v1/incidents')
      .set({ 'Authorization': id })
      .send({
        title: 'Title of incident',
        description: 'Description of incident',
        value: 25
      })
      .type('form')
      .expect(201);
    
    // await request(app)
    //   .delete(`/v1/incidensts/${incident.body.id}`)
    //   .set({ 'Authorization': id })
    //   .expect(204);
  });
});
