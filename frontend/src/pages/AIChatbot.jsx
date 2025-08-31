import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DashboardLayout from "../componet/dashboard/dashboardLayout";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Chat() {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hop Wellness here, what do you need help with?",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    const apiChatHistory = messages.slice(1).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    apiChatHistory.push({ role: "user", parts: [{ text: userMessage.text }] });

    try {
      const response = await axios.post(`${backendUrl}`/api/chat, {
        chatHistory: apiChatHistory,
      });
      const botResponseText = response.data.text;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponseText },
      ]);
    } catch (error) {
      console.error("Error sending message to backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the server or there was an API error.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen max-h-[85vh] bg-white dark:bg-gray-950">
        <header className="px-6 py-4 border-b border-green-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
          <h1 className="text-2xl font-semibold text-green-700 dark:text-green-300 tracking-tight">
            AI Assistant
          </h1>
          <div className="text-xs flex items-center text-black dark:text-gray-400">
            <span className="inline-block bg-green-600 w-2 h-2 rounded-full mr-2" />
            {isLoading ? "Generating response..." : "Online"}
          </div>
        </header>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth bg-white dark:bg-gray-950"
        >
          {messages.map((msg, i) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={i}
                className={`group flex w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-green-300 dark:border-gray-700 rounded-bl-sm"
                  }`}
                >
                  {!isUser && (
                    <span className="absolute -top-5 left-0 text-[10px] font-medium uppercase tracking-wide text-green-500 dark:text-green-300">
                      Bot
                    </span>
                  )}
                  {isUser && (
                    <span className="absolute -top-5 right-0 text-[10px] font-medium uppercase tracking-wide text-green-400">
                      You
                    </span>
                  )}
                  {msg.text}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pl-1">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse delay-150" />
              <div className="h-2 w-2 rounded-full bg-green-200 animate-pulse delay-300" />
              <span className="ml-2">Thinking...</span>
            </div>
          )}
          <div className="h-1" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 border-t border-green-100 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="flex items-end gap-3">
            <div className="relative flex-1">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything about your Health, Fitness, Nutrition..."
                className="w-full resize-none rounded-xl border border-green-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:border-green-400 dark:focus:ring-green-500/40 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                aria-label="Chat input"
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-green-500 transition-colors disabled:opacity-40"
                  title="(Attachment placeholder)"
                  disabled
                >
                  📎
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-medium px-5 py-3 text-sm shadow-md shadow-green-500/20 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending
                </span>
              ) : (
                "Send"
              )}
            </button>
          </div>
          <p className="mt-2 text-[10px] text-center text-gray-400 dark:text-gray-500">
            Shift + Enter for new line
          </p>
        </form>
      </div>
    </DashboardLayout>
  );
}
