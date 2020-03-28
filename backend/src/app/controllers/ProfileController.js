import connection from '../../database';

class ProfileController {
  static async index(req, res) {
    const ong_id = req.headers.authorization;

    try {
      const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

      return res.status(200).json({ incidents });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }
}

export default ProfileController;
