import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const API_TOKEN = "fdcd45850fb7eeff7e0460a650413e209f99ad64";

router.post("/nutrition", async (req, res) => {
  try {
    const { recipe_tags } = req.body;

    const nutritionRes = await fetch("https://api.logmeal.es/v2/nutrition/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ recipe_tags }),
    });

    const nutritionData = await nutritionRes.json();
    res.status(nutritionRes.status).json(nutritionData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

export default router;
