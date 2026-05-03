import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

interface Message {
  role: "bot" | "user";
  text: string;
}

const fmt = (n: number) => `KES ${n.toLocaleString()}`;

// ---------- budget parsing ----------
const parseBudget = (text: string): number | null => {
  // Match patterns like "30k", "30,000", "30000", "KES 30000", "30 thousand"
  const normalized = text.toLowerCase().replace(/,/g, "").replace(/kes\s*/g, "");
  const kMatch = normalized.match(/(\d+(?:\.\d+)?)\s*k\b/);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;
  const thousandMatch = normalized.match(/(\d+)\s*thousand/);
  if (thousandMatch) return parseInt(thousandMatch[1]) * 1000;
  // plain number ≥ 1000 (avoid matching small numbers like "2" or "5")
  const numMatch = normalized.match(/\b(\d{4,})\b/);
  if (numMatch) return parseInt(numMatch[1]);
  return null;
};

// ---------- accessory suggestions based on cart ----------
const suggestAccessories = (cartItems: Product[]): string => {
  const cartBrands = new Set(cartItems.map(i => i.brand));
  const cartIds = new Set(cartItems.map(i => i.id));
  const accessories = products.filter(
    p => p.category === "Accessories" && !cartIds.has(p.id)
  );
  // prioritise accessories matching cart brands
  const brandMatch = accessories.filter(a => cartBrands.has(a.brand));
  const picks = brandMatch.length > 0 ? brandMatch : accessories;
  if (picks.length === 0) return "You've already got all our accessories! 🎉";
  return (
    "Based on what's in your cart, I'd recommend:\n\n" +
    picks.map(p => `• **${p.name}** — ${fmt(p.price)}`).join("\n") +
    "\n\nWant to add any of these?"
  );
};

// ---------- smart response engine ----------
const getResponse = (
  input: string,
  cartItems: Product[]
): string => {
  const lower = input.toLowerCase();

  // --- budget-based recommendation ---
  const budget = parseBudget(input);
  if (
    budget !== null ||
    /budget|affordable|cheap|under|below|within|range|spend/i.test(lower)
  ) {
    const cap = budget ?? 50000; // default budget if just "budget" keyword
    const matches = products
      .filter(p => p.price <= cap && p.inStock && p.category !== "Accessories")
      .sort((a, b) => b.price - a.price)
      .slice(0, 4);

    if (matches.length === 0) {
      return `Hmm, we don't have phones under **${fmt(cap)}** right now. Our most affordable option is the **${
        products.filter(p => p.category !== "Accessories").sort((a, b) => a.price - b.price)[0].name
      }** at **${fmt(
        products.filter(p => p.category !== "Accessories").sort((a, b) => a.price - b.price)[0].price
      )}**. Want to check it out?`;
    }

    return (
      `💰 Great! Here's what fits within **${fmt(cap)}**:\n\n` +
      matches.map(p => `• **${p.name}** — ${fmt(p.price)}${p.originalPrice ? ` ~~${fmt(p.originalPrice)}~~` : ""}`).join("\n") +
      "\n\nWant specs or to add one to your cart?"
    );
  }

  // --- brand queries ---
  const brandKeywords: Record<string, string[]> = {
    Apple: ["iphone", "apple", "ios"],
    Samsung: ["samsung", "galaxy"],
    Tecno: ["tecno", "camon"],
    Infinix: ["infinix", "note"],
  };
  for (const [brand, keys] of Object.entries(brandKeywords)) {
    if (keys.some(k => lower.includes(k))) {
      const brandProducts = products.filter(p => p.brand === brand && p.inStock);
      if (brandProducts.length === 0) return `We don't currently have any **${brand}** products in stock. Check back soon!`;
      return (
        `📱 Here's our **${brand}** lineup:\n\n` +
        brandProducts.map(p => `• **${p.name}** — ${fmt(p.price)}${p.badge ? ` ${p.badge}` : ""}`).join("\n") +
        "\n\nWant specs or recommendations?"
      );
    }
  }

  // --- accessories / suggest for cart ---
  if (/accessor|earbuds?|charger|case|buds|cable|protect/i.test(lower)) {
    if (cartItems.length > 0) {
      return "🎧 " + suggestAccessories(cartItems);
    }
    const acc = products.filter(p => p.category === "Accessories");
    return (
      "🎧 Here are our top accessories:\n\n" +
      acc.map(p => `• **${p.name}** — ${fmt(p.price)}`).join("\n") +
      "\n\nAll original with warranty! 🔌"
    );
  }

  // --- what's in my cart / cart summary ---
  if (/cart|bag|added|what.*have/i.test(lower)) {
    if (cartItems.length === 0) return "Your cart is empty right now! 🛒 Browse our collection and I'll help you pick the perfect phone.";
    const total = cartItems.reduce((s, i) => s + i.price, 0);
    return (
      "🛒 Here's what's in your cart:\n\n" +
      cartItems.map(i => `• **${i.name}** — ${fmt(i.price)}`).join("\n") +
      `\n\n**Total: ${fmt(total)}**\n\nWant me to suggest matching accessories?`
    );
  }

  // --- recommend / suggest (general) ---
  if (/recommend|suggest|best|top|popular|which|what.*buy|pick/i.test(lower)) {
    if (cartItems.length > 0) {
      return "Based on your cart, here are some suggestions:\n\n" + suggestAccessories(cartItems);
    }
    const top = products.filter(p => p.badge).slice(0, 3);
    return (
      "⭐ Our top picks right now:\n\n" +
      top.map(p => `• **${p.name}** — ${fmt(p.price)} ${p.badge}`).join("\n") +
      "\n\nTell me your budget and I'll narrow it down!"
    );
  }

  // --- compare ---
  if (/compare|vs|versus|differ/i.test(lower)) {
    return "I can compare phones for you! Just mention two brands or models, like:\n\n• \"iPhone vs Samsung\"\n• \"Tecno vs Infinix\"\n\nWhat would you like to compare?";
  }

  // --- specs ---
  const matchedProduct = products.find(p => lower.includes(p.name.toLowerCase().split(" ").slice(0, 2).join(" ")));
  if (matchedProduct || /spec|detail|feature|camera|battery|storage|screen/i.test(lower)) {
    const p = matchedProduct ?? products[0];
    if (matchedProduct) {
      return (
        `📋 **${p.name}** specs:\n\n` +
        p.specs.map(s => `• ${s}`).join("\n") +
        `\n\n💰 **${fmt(p.price)}**${p.originalPrice ? ` ~~${fmt(p.originalPrice)}~~` : ""}` +
        `\n${p.inStock ? "✅ In Stock" : "❌ Out of Stock"}` +
        `\n⭐ ${p.rating}/5 (${p.reviews} reviews)`
      );
    }
    return "Which product would you like specs for? You can say something like \"iPhone 15 specs\" or \"Galaxy S24 details\".";
  }

  // --- deals ---
  if (/deal|sale|discount|offer|promo|flash/i.test(lower)) {
    const deals = products.filter(p => p.originalPrice);
    return (
      "🔥 Current deals & discounts:\n\n" +
      deals.map(p => {
        const pct = Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100);
        return `• **${p.name}** — ${fmt(p.price)} ~~${fmt(p.originalPrice!)}~~ (**${pct}% off**)`;
      }).join("\n") +
      "\n\nThese won't last long! 🏃"
    );
  }

  // --- refurbished ---
  if (/refurb|used|second.?hand|pre.?owned/i.test(lower)) {
    const refurb = products.filter(p => p.condition === "Refurbished");
    if (refurb.length === 0) return "No refurbished phones right now — check back soon!";
    return (
      "♻️ Our refurbished phones are **Grade A** — like new with warranty:\n\n" +
      refurb.map(p => `• **${p.name}** — ${fmt(p.price)}${p.originalPrice ? ` ~~${fmt(p.originalPrice)}~~` : ""}`).join("\n") +
      "\n\nGreat value! Want more info?"
    );
  }

  // --- order / delivery ---
  if (/order|track/i.test(lower)) {
    return "📦 To track your order, share your order number and I'll look it up! You can also check your email for tracking updates.";
  }
  if (/deliver|shipping|ship/i.test(lower)) {
    return "🚚 We deliver across Kenya!\n\n• **Nairobi CBD**: Same-day delivery\n• **Greater Nairobi**: 1-2 days\n• **Rest of Kenya**: 2-5 days via courier\n\nFree delivery on orders above KES 10,000!";
  }

  // --- payment ---
  if (/pay|mpesa|m-pesa|card|visa|checkout/i.test(lower)) {
    return "💳 We accept:\n\n• **M-Pesa** (STK Push — instant!)\n• **Visa / Mastercard**\n• **Cash on Delivery** (Nairobi only)\n\nReady to checkout? Head to your cart!";
  }

  // --- greeting ---
  if (/^(hi|hey|hello|sup|yo|jambo|sasa|niaje)/i.test(lower)) {
    return "Hey there! 👋 Welcome to PhonePlugKE! How can I help?\n\n• Tell me your budget for phone picks\n• Ask about any brand\n• Say \"what's in my cart\" for a summary\n• Ask for accessory suggestions";
  }

  // --- fallback ---
  return "I can help with lots of things! Try:\n\n• 💰 \"Phones under 50k\"\n• 📱 \"Show me iPhones\"\n• 🎧 \"Suggest accessories\"\n• 🛒 \"What's in my cart?\"\n• 🔥 \"Any deals?\"\n• 📋 \"iPhone 15 specs\"\n\nJust ask away! 😊";
};

const initialMessages: Message[] = [
  {
    role: "bot",
    text: "Hey there! 👋 I'm **PlugBot**, your PhonePlugKE assistant!\n\nI can:\n• 📱 Recommend phones by budget (\"phones under 50k\")\n• 🎧 Suggest accessories for your cart\n• 📋 Show product specs\n• 🔥 Find the best deals\n• 📦 Help track orders\n\nWhat are you looking for?",
  },
];

const PlugBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { items } = useCart();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const cartProducts = items.map(({ quantity, ...rest }) => rest);
      setMessages(prev => [...prev, { role: "bot", text: getResponse(userMsg.text, cartProducts) }]);
      setTyping(false);
    }, 700);
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
            <div className="p-4 gradient-bg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm">🤖</div>
              <div>
                <h3 className="font-display font-bold text-primary-foreground text-sm">PlugBot</h3>
                <p className="text-primary-foreground/70 text-xs">Online • Ready to help</p>
              </div>
            </div>

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
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted text-muted-foreground text-sm flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-glass">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Try &quot;phones under 50k&quot;..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-glass text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button type="submit" className="p-2.5 rounded-xl gradient-bg text-primary-foreground">
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
