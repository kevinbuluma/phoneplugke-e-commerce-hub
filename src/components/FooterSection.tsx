import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "James M.", rating: 5, text: "Got my iPhone 15 Pro Max delivered same day in Nairobi. Legit plug! 🔥", date: "2 days ago" },
  { name: "Wanjiku K.", rating: 5, text: "Best prices for Samsung accessories. The charger kit is amazing quality.", date: "1 week ago" },
  { name: "Brian O.", rating: 4, text: "Bought a refurbished iPhone 13 — looks brand new! Great warranty too.", date: "2 weeks ago" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/* Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
            Customer <span className="gradient-text">Reviews</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-subtle p-5"
              >
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3">{r.text}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="font-semibold">{r.name}</span>
                  <span>{r.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Stay in the Loop</h3>
            <p className="text-muted-foreground text-sm mb-6">Get notified about new arrivals, flash sales, and exclusive deals</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                required
                maxLength={255}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-muted border border-glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" className="px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold">
                {subscribed ? "✅" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-display text-lg font-bold">
                <span className="gradient-text">PhonePlug</span>
                <span className="text-foreground">KE</span>
              </span>
              <p className="text-xs text-muted-foreground mt-1">Your trusted tech plug in Nairobi 🇰🇪</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary transition-colors text-sm font-bold">
                IG
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary transition-colors text-sm font-bold">
                TikTok
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              © 2026 PhonePlugKE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
