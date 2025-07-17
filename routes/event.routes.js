import { Router } from 'express';
import {newEvent, changeEvent, removeEvent, readEvent, addParticipant} from '../controllers/event.controller.js';
import { ensureLoggedIn } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/new-event', newEvent);
router.put('/change-event', changeEvent);
router.delete('/delete-event/:eventId', removeEvent);
router.get('/events', readEvent);
router.post('/events/:eventId/participants', ensureLoggedIn, addParticipant);

export default router;