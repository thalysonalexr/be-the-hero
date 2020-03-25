import express from 'express';
import OngController from './app/controllers/OngController';
import IncidentController from './app/controllers/IncidentController';
import ProfileController from './app/controllers/ProfileController';
import SessionController from './app/controllers/SessionController';

const router = express.Router();

router.post('/session', SessionController.store);
router.get('/profile', ProfileController.index);

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.store);

router.get('/incidents', IncidentController.index);
router.post('/incidents', IncidentController.store);
router.delete('/incidents/:id', IncidentController.destroy);

export default router;
