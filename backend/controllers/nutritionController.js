import axios from 'axios';
import { BASE_URL, SUBSCRIPTION_ID } from '../config/nutridigm.js';

const FOOD_GROUPS = [
  { name: "Nuts & Seeds", code: "c3" },
  { name: "Vegetables", code: "c1" },
  { name: "Fruits", code: "c2" },
  { name: "Dairy", code: "c4" },
];

const CONDITIONS = [
  { name: "Diabetes Type 1", id: 30 },
  { name: "Diabetes Type 2", id: 31 }
];

export const getFoodGroups = (req, res) => {
  res.json(FOOD_GROUPS);
};

export const getConditions = (req, res) => {
  res.json(CONDITIONS);
};

export const suggestFood = async (req, res) => {
  const { healthConditionID, fineFoodGroup } = req.body;

  if (!healthConditionID || !fineFoodGroup) {
    return res.status(400).json({ message: 'Missing healthConditionID or fineFoodGroup' });
  }

  const url = `${BASE_URL}/suggest?subscriptionID=${SUBSCRIPTION_ID}&healthConditionID=${healthConditionID}&fineFoodGroup=${fineFoodGroup}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching from Nutridigm:', err.message);
    res.status(500).json({ message: 'Failed to fetch suggestion' });
  }
};


export const evaluateMealPlan = async (req, res) => {
  const { healthConditionID, foodItems } = req.body;

  if (!healthConditionID || !foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
    return res.status(400).json({ 
      message: 'Missing or invalid healthConditionID or foodItems array' 
    });
  }

  try {
    
    const foodsString = foodItems.join(','); 
    const url = `${BASE_URL}/evaluate?subscriptionID=${SUBSCRIPTION_ID}&healthConditionID=${healthConditionID}&foodItems=${foodsString}`;

    const response = await axios.get(url);
    res.json(response.data);

  } catch (err) {
    console.error('Error evaluating meal plan with Nutridigm:', err.message);
    
    if (err.response) {
      console.error('Nutridigm response error:', err.response.data);
    }
    
    res.status(500).json({ message: 'Failed to evaluate meal plan' });
  }
};