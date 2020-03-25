import connection from '../../database';

class IncidentController {
  static table = 'incidents';

  static async index(req, res) {
    const { page = 1 } = req.query;
    
    try {
      const [ count ] = await connection(IncidentController.table)
        .count();
      
      let incidents = await connection(IncidentController.table)
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        ]);

      res.header('X-Total-Count', count['count(*)']);
      return res.status(200).json({ incidents });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error.' })
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    try {
      const incident = await connection(IncidentController.table)
        .where('id', id)
        .select()
        .first();

      if (incident.ong_id !== ong_id) {
        return res.status(401).json({ error: 'Not Authorization' });
      }

      await connection(IncidentController.table).where('id', id).delete();

      return res.status(204).end();
    } catch {
      return res.status(500).json({ error: 'Internal Server Error.' })
    }
  }

  static async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    
    try {
      const [ id ] = await connection(IncidentController.table)
        .insert({ title, description, value, ong_id });

      return res.status(201).json({ id });
    } catch {
      return res.status(500).json({ error: 'Internal Server Error.' })
    }
  }
}

export default IncidentController
