import express from 'express';
import { suggestRotation } from '../controllers/rotationController.js';

const router = express.Router();

router.post('/suggest', suggestRotation);

export default router;
