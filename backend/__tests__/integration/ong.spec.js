import request from 'supertest';

import app from '../../src/app';
import conn from '../../src/database';

describe('ONG', () => {

  beforeEach(async () => {
    // await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it('should be able to create new ONG', async () => {

    const response = await request(app)
      .post('/v1/ongs')
      .set({ 'Content-Type': 'application/json' })
      .send({
        name: 'APAE',
        email: 'contato@apae.com.br',
        whatsapp: '67999999999',
        city: 'Sonora',
        uf: 'MS'
      })
      .type('form')
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able list all the ongs', async () => {
    const response = await request(app)
      .get('/v1/ongs')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        ongs: expect.arrayContaining([
          expect.objectContaining({
            name: 'APAE',
            email: 'contato@apae.com.br',
            whatsapp: '67999999999',
            city: 'Sonora',
            uf: 'MS'
          })
        ])
      })
    );
  });
});
