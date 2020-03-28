import request from 'supertest';

import app from '../../src/app';
import conn from '../../src/database';

describe('PROFILE', () => {

  beforeEach(async () => {
    // await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it('should be able list all specifics incidents by ONG', async () => {
    const ong = {
      name: 'APAE',
      email: 'contato@apae.com.br',
      whatsapp: '67999999999',
      city: 'Sonora',
      uf: 'MS'
    };

    const incident = {
      title: 'Title of incident',
      description: 'Description of incident',
      value: 25
    };

    const { body: { id } } = await request(app)
      .post('/v1/ongs')
      .send(ong)
      .type('form')
      .expect(201);

    const idIncident = await request(app)
      .post('/v1/incidents')
      .set({ 'Authorization': id })
      .send(incident)
      .type('form')
      .expect(201);

    incident['id'] = idIncident.body.id;
    incident['ong_id'] = id;

    const response = await request(app)
      .get('/v1/profile')
      .set({ 'Authorization': id })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        incidents: expect.arrayContaining([
          expect.objectContaining(incident)
        ])
      })
    );
  });
});