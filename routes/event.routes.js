import { Router } from 'express';
import {newEvent, changeEvent, removeEvent, readEvent} from '../controllers/event.controller.js';

const router = Router();

router.post('/new-event', newEvent);
router.put('/change-event', changeEvent);
router.delete('/delete-event/:eventId', removeEvent);
router.get('/read-event', readEvent);

export default router;