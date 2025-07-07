import { Bot, Send, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm PawSewa AI 🐾. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { from: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5005/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        from: "ai",
        text: data.reply || "I'm not sure how to answer that right now!",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Oops! Something went wrong. 🐾" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    sendMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[400px] md:w-[500px] h-[580px] bg-white shadow-2xl rounded-3xl overflow-hidden z-50 border border-gray-200 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#747134] to-[#8a8142] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-base">PawSewa AI Assistant</h3>
            <p className="text-xs text-white/80">Always here to help your pets</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          aria-label="Close Chat"
          className="hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
        >
          <X size={18} />
        </button>
      </div>

      {/* Example Prompts */}
      {messages.length === 1 && !loading && (
        <div className="px-6 py-4 bg-gradient-to-b from-gray-50 to-white border-b space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#747134]" />
            <h3 className="text-sm font-semibold text-gray-700">Try asking about</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "My dog has a fever 🐶🌡️",
              "What to feed a sick cat? 🐱🍲",
              "Is vomiting in rabbits serious? 🐰🤒",
              "How often should I groom my dog? ✂️🐕",
              "Home remedy for dog diarrhea 💩🐕"
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(prompt)}
                className="bg-white hover:bg-[#747134] hover:text-white text-sm px-3 py-2 rounded-full border border-gray-200 text-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "ai" && (
              <div className="bg-gradient-to-br from-[#747134] to-[#8a8142] text-white p-2.5 rounded-full shadow-lg">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`px-4 py-3 max-w-[75%] rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.from === "user"
                  ? "bg-gradient-to-br from-[#747134] to-[#8a8142] text-white rounded-tr-md"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-md"
              }`}
            >
              {msg.text.split('\n').map((line, idx) => (
                <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
              ))}
            </div>
            {msg.from === "user" && (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-2.5 rounded-full shadow-sm">
                <User size={16} className="text-[#747134]" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
            <div className="bg-gradient-to-br from-[#747134] to-[#8a8142] text-white p-2.5 rounded-full shadow-lg">
              <Bot size={16} />
            </div>
            <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#747134] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#747134] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#747134] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500">PawSewa AI is typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your pet..."
            className="w-full border border-gray-300 px-4 py-3 pr-12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#747134] hover:text-[#5f5e2a] disabled:text-gray-400 transition-all duration-200 hover:scale-110 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;