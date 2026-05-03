import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

const FlashDealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const deals = [
    { name: "iPhone 14 Pro", discount: "25% OFF", price: "KES 134,999", original: "KES 179,999" },
    { name: "Galaxy Watch 6", discount: "30% OFF", price: "KES 24,999", original: "KES 35,999" },
    { name: "USB-C Hub Pro", discount: "40% OFF", price: "KES 3,599", original: "KES 5,999" },
  ];

  return (
    <section id="deals" className="py-20">
      <div className="container mx-auto px-4">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Flash Sale</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Today's <span className="gradient-text">Hot Deals</span>
                </h2>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Clock className="w-5 h-5 text-primary" />
                <div className="flex gap-2">
                  {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((val, i) => (
                    <div key={i} className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-primary-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deals.map((deal, i) => (
                <motion.div
                  key={deal.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card-subtle p-5 flex flex-col"
                >
                  <span className="text-xs font-bold text-primary mb-1">{deal.discount}</span>
                  <h3 className="font-display font-semibold text-foreground mb-2">{deal.name}</h3>
                  <div className="flex items-end gap-2 mt-auto">
                    <span className="font-display font-bold text-lg text-foreground">{deal.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{deal.original}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashDealsSection;
