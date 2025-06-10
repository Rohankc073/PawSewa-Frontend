import axios from "axios";
import { Bot, Send, User, X } from "lucide-react";
import { useState } from "react";

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm PawSewa AI 🐾. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5005/ai/ask", {
        message: input,
      });

      const aiMessage = {
        from: "ai",
        text: res.data.reply || "I'm not sure how to answer that right now!",
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[400px] md:w-[500px] h-[580px] bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-[#747134] text-white px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={22} />
          <span className="font-semibold text-base">PawSewa AI Assistant</span>
        </div>
        <button onClick={onClose} aria-label="Close Chat">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      {/* Example Prompts */}
{messages.length === 1 && !loading && (
  <div className="px-5 py-4 bg-white border-b space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">Example Prompts</h3>
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
          onClick={() => {
            setInput(prompt);
            sendMessage(prompt); // directly send on click
          }}
          className="bg-[#f0f0f0] hover:bg-[#e4e2cf] text-sm px-3 py-1 rounded-lg border text-[#1d1d48] transition"
        >
          {prompt}
        </button>
      ))}
    </div>
  </div>
)}

      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#f9f9f9]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "ai" && (
              <div className="bg-[#747134] text-white p-2 rounded-full">
                <Bot size={18} />
              </div>
            )}
            <div
              className={`px-4 py-2 max-w-[70%] rounded-xl text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-[#747134] text-white rounded-tr-none"
                  : "bg-white text-gray-800 border rounded-tl-none"
              }`}
            >
              {msg.text.split('\n').map((line, idx) => (
  <p key={idx} className="mb-1">{line}</p>
))}
            </div>
            {msg.from === "user" && (
              <div className="bg-[#e0e0e0] text-white p-2 rounded-full">
                <User size={18} className="text-[#1d1d48]" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <p className="text-left text-xs text-gray-500 italic">PawSewa AI is typing...</p>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your pet..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#747134]"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="text-[#747134] hover:text-[#5f5e2a] transition"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
