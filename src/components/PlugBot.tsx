import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const initialMessages: Message[] = [
  { role: "bot", text: "Hey there! 👋 I'm **PlugBot**, your PhonePlugKE assistant. How can I help you today?\n\n• 📱 Recommend a phone\n• 💰 Find budget options\n• 📦 Track your order\n• 🎧 Suggest accessories" },
];

const botResponses: Record<string, string> = {
  budget: "Great choice! 💰 Here are some awesome budget picks:\n\n• **Tecno Camon 30 Pro** — KES 34,999\n• **Infinix Note 40 Pro** — KES 29,999\n• **iPhone 13 (Refurbished)** — KES 59,999\n\nWant more details on any of these?",
  iphone: "🍎 We have the best iPhone deals in Nairobi!\n\n• **iPhone 15 Pro Max** — KES 189,999\n• **iPhone 13 (Refurbished)** — KES 59,999\n\nAll iPhones come with a warranty! Want me to add one to your cart?",
  samsung: "📱 Samsung lovers, we got you!\n\n• **Galaxy S24 Ultra** — KES 174,999\n• **Galaxy Buds FE** — KES 12,999\n\nThe S24 Ultra has amazing AI features! Interested?",
  accessories: "🎧 Here are our top accessories:\n\n• **AirPods Pro 2** — KES 34,999\n• **Galaxy Buds FE** — KES 12,999\n• **65W Fast Charger Kit** — KES 2,999\n\nAll original with warranty! 🔌",
  order: "📦 To track your order, please share your order number and I'll look it up for you! You can also check your email for tracking updates.",
  delivery: "🚚 We deliver across Kenya!\n\n• **Nairobi CBD**: Same-day delivery\n• **Greater Nairobi**: 1-2 days\n• **Rest of Kenya**: 2-5 days via courier\n\nFree delivery on orders above KES 10,000!",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("affordable")) return botResponses.budget;
  if (lower.includes("iphone") || lower.includes("apple")) return botResponses.iphone;
  if (lower.includes("samsung") || lower.includes("galaxy")) return botResponses.samsung;
  if (lower.includes("accessor") || lower.includes("earbuds") || lower.includes("charger") || lower.includes("case")) return botResponses.accessories;
  if (lower.includes("order") || lower.includes("track")) return botResponses.order;
  if (lower.includes("deliver") || lower.includes("shipping")) return botResponses.delivery;
  return "Thanks for reaching out! 😊 I can help you with:\n\n• Phone recommendations\n• Budget options\n• Order tracking\n• Accessories\n• Delivery info\n\nJust ask away!";
};

const PlugBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: getResponse(userMsg.text) }]);
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg animate-pulse-glow"
      >
        {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] flex flex-col glass-card overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 gradient-bg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm">🤖</div>
              <div>
                <h3 className="font-display font-bold text-primary-foreground text-sm">PlugBot</h3>
                <p className="text-primary-foreground/70 text-xs">Online • Ready to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "gradient-bg text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j}>{part.slice(2, -2)}</strong>
                        : <span key={j}>{part}</span>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-glass">
              <form
                onSubmit={e => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask PlugBot..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-glass text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl gradient-bg text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlugBot;
