import express from 'express';

import OngController from './app/controllers/OngController';
import IncidentController from './app/controllers/IncidentController';
import ProfileController from './app/controllers/ProfileController';
import SessionController from './app/controllers/SessionController';

import OngValidator from './app/validators/OngValidator';
import IncidentValidator from './app/validators/IncidentValidator';
import ProfileValidator from './app/validators/ProfileValidator';
import SessionValidator from './app/validators/SessionValidator';

const router = express.Router();

router.post('/session', SessionValidator.store(), SessionController.store);
router.get('/profile', ProfileValidator.index(), ProfileController.index);

router.get('/ongs', OngController.index);
router.post('/ongs', OngValidator.store(), OngController.store);

router.get('/incidents', IncidentValidator.index(), IncidentController.index);
router.post('/incidents', IncidentValidator.store(), IncidentController.store);
router.delete('/incidents/:id', IncidentValidator.destroy(), IncidentController.destroy);

export default router;
