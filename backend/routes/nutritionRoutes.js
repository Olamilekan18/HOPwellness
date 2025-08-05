import express from 'express';
const router = express.Router();
import {
  getFoodGroups,
  getConditions,
  suggestFood
} from '../controllers/nutritionController.js';

router.post('/suggest', suggestFood);
router.get('/conditions', getConditions);
router.get('/groups', getFoodGroups);

export default router;