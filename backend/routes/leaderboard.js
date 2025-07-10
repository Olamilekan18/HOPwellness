import express from "express";
import { getXpLeaderboard, getStreakLeaderboard} from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/xp", getXpLeaderboard);
router.get("/streak", getStreakLeaderboard);


export default router;
