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
              <a href="https://www.instagram.com/phoneplug__254?igsh=eTRkbDU2dGNkbm0y" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary transition-colors flex items-center justify-center" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@phoneplug254?_r=1&_t=ZS-9634A7IavMu" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-primary transition-colors flex items-center justify-center" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.58 2.22-7.03 1.53-2.5-.7-4.47-2.44-5.36-4.92-.81-2.28-.6-4.94.7-6.99 1.25-2.01 3.32-3.3 5.65-3.75 1.52-.3 3.08-.2 4.54.34v4.22c-1.1-.24-2.29-.18-3.32.25-1.07.45-1.92 1.35-2.29 2.44-.33.95-.23 2.06.27 2.92.48.83 1.34 1.43 2.28 1.63.95.2 2.02.08 2.87-.41.87-.5 1.48-1.35 1.7-2.33.15-.65.17-1.32.17-1.99V.02z" />
                </svg>
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
