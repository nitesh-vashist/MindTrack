import express from 'express';
import { createTrack } from '../controllers/trackController.js';

const router = express.Router();

router.post('/tracks', createTrack); // POST /api/tracks

export default router;
