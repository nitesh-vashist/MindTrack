// server/controllers/trackController.js
import { Track } from '../models/Track.js';

export const createTrack = async (req, res) => {
  try {
    const newTrack = new Track(req.body);
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create track', error: err.message });
  }
};


