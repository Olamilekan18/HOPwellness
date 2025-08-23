import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

const router = express.Router();
const genAI = new GoogleGenerativeAI(API_KEY);

if (!API_KEY) {
    console.error("API key is not set. Please create a .env file with GEMINI_API_KEY.");
    process.exit(1);
}

const systemPrompt = "You are a helpful and kind health assistant. Your purpose is to provide general health suggestions, wellness tips, and advice on topics like nutrition, exercise, and mental well-being. ALWAYS start your responses with a friendly greeting. IMPORTANT: Never provide a medical diagnosis, prescription, or treatment plan. Always advise the user to consult with a qualified healthcare professional for medical concerns. State this disclaimer clearly and friendly in your first message. You are not a medical professional, and your advice is for informational purposes only. Always prioritize the user's health and well-being. If the user asks for medical advice, gently remind them to seek professional help. Be friendly, supportive, and informative. Let your responses be precise, concise and effective.No much rumbling";

router.post('/', async (req, res) => {
    try {
        const { chatHistory } = req.body; 

        
        const apiChatHistory = [
            {
                role: "user",
                parts: [{ text: systemPrompt }]
            },
            {
                role: "model",
                parts: [{ text: "Hello! I am here to assist with general health suggestions and wellness tips. Please remember to always consult with a qualified healthcare professional for any medical concerns you may have. How can I help you today?" }]
            },
            ...chatHistory 
        ];

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

        const chatSession = model.startChat({
            history: apiChatHistory,
        });

        const result = await chatSession.sendMessage(chatHistory[chatHistory.length - 1].parts[0].text);
        const responseText = result.response.text();
        
        res.json({ text: responseText });
    } catch (error) {
        console.error("Error in API call:", error);
        res.status(500).json({ error: "An error occurred with the Gemini API." });
    }
});

export default router;