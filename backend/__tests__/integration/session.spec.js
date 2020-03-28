import request from 'supertest';

import app from '../../src/app';
import conn from '../../src/database';

describe('SESSION', () => {

  beforeEach(async () => {
    // await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it('should be able create new session to ONG', async () => {
    const ong = {
      name: 'APAE',
      email: 'contato@apae.com.br',
      whatsapp: '67999999999',
      city: 'Sonora',
      uf: 'MS'
    };

    const { body: { id } } = await request(app)
      .post('/v1/ongs')
      .set({ 'Content-Type': 'application/json' })
      .send(ong)
      .type('form')
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');
    
    const response = await request(app)
      .post('/v1/session')
      .send({ id })
      .type('form')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        ong: expect.objectContaining({
          name: ong.name
        })
      })
    );
  });
});
