import { useState, useEffect, useRef } from "react";
import axios from "axios";  

export default function Chat() {
      const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
        setMessages([{ sender: 'bot', text: "Hello! I'm a MERN stack chatbot. How can I help you today?" }]);
    }, []);

      useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

 const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input.trim() };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsLoading(true);

       
        const apiChatHistory = messages.slice(1).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        apiChatHistory.push({ role: 'user', parts: [{ text: userMessage.text }] });

        try {
            const response = await axios.post('http://localhost:5000/api/chat', { chatHistory: apiChatHistory });
            const botResponseText = response.data.text;
            
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
        } catch (error) {
            console.error('Error sending message to backend:', error);
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: "Sorry, I couldn't connect to the server or there was an API error." }]);
        } finally {
            setIsLoading(false);
        }
    };
 return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">HOP WELLNESS</h1>
            <div className="flex-1 overflow-y-auto p-4 bg-white rounded-xl shadow-lg mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`my-2 p-3 rounded-lg max-w-[80%] break-words ${msg.sender === 'user' ? 'ml-auto bg-indigo-500 text-white' : 'mr-auto bg-gray-300 text-gray-900'}`}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center space-x-2 my-2 text-gray-500 animate-pulse">
                        <span className="font-bold">Bot is thinking...</span>
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                    onClick={sendMessage}
                    className="p-3 bg-gree-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    );
};