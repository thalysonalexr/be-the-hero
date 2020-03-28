import generateUniqueId from '../utils/generateUniqueId';

import connection from '../../database';

class OngController {
  static async index(req, res) {
    try {
      const ongs = await connection('ongs').select('*');

      return res.status(200).json({ ongs });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    try {
      const id = generateUniqueId();

      await connection('ongs')
        .insert({ id, name, email, whatsapp, city, uf });

      return res.status(201).json({ id });
    } catch {
      return res.status(400).json({ error: 'Bad Request.' });
    }
  }
}

export default OngController;
