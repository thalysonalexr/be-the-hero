import crypto from 'crypto';
import connection from '../../database';

class OngController {
  static table = 'ongs';

  static async index(req, res) {
    try {
      const ongs = await connection(OngController.table).select('*');

      return res.status(200).json({ ongs });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    try {
      const id = crypto.randomBytes(4).toString('HEX');

      await connection(OngController.table)
        .insert({ id, name, email, whatsapp, city, uf });

      return res.status(201).json({ id });
    } catch {
      return res.status(400).json({ error: 'Bad Request.' });
    }
  }
}

export default OngController;
