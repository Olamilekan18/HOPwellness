import express from 'express';
const router = express.Router();
import {
  getFoodGroups,
  getConditions,
  suggestFood,
  evaluateMealPlan
} from '../controllers/nutritionController.js';

router.post('/suggest', suggestFood);
router.get('/conditions', getConditions);
router.get('/groups', getFoodGroups);
router.post('/evaluate', evaluateMealPlan);

export default router;