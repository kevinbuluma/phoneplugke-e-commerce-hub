import { motion } from "framer-motion";
import { ShoppingBag, Zap } from "lucide-react";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-[120px]" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            Nairobi's #1 Smartphone Plug
          </motion.span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            Plug into the
            <br />
            <span className="gradient-text">Future</span> with
            <br />
            PhonePlugKE
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Premium smartphones, accessories & unbeatable deals. From flagship iPhones to budget-friendly Tecno — we've got your tech covered across Kenya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProducts}
              className="px-8 py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg flex items-center gap-2 glow-pink"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-2xl border border-glass bg-card/50 backdrop-blur-sm text-foreground font-semibold text-lg hover:border-primary/50 transition-colors"
            >
              View Deals 🔥
            </motion.button>
          </div>
        </motion.div>

        {/* Floating phone mockups */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-3xl gradient-bg opacity-20 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop"
              alt="Featured smartphone"
              className="relative rounded-3xl w-full h-full object-cover border border-glass"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
