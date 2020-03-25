import connection from '../../database';

class SessionController {
  static table = 'ongs';

  static async store(req, res) {
    const { id } = req.body;

    try {
      const ong = await connection(SessionController.table)
        .where('id', id)
        .select('name')
        .first();

      if (!ong) {
        return res.status(404).json({ error: 'Ong not exists.' });
      }

      return res.status(200).json({ ong });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default SessionController
