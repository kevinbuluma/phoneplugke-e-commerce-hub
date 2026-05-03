import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = ["Home", "Shop", "Deals", "About", "Contact"];

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-glass"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold">
          <span className="gradient-text">PhonePlug</span>
          <span className="text-foreground">KE</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link === "Shop" ? "products" : link.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="relative w-12 h-6 rounded-full bg-muted border border-glass flex items-center transition-colors"
          >
            <motion.div
              layout
              className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center"
              style={{ marginLeft: isDark ? 2 : 22 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {isDark ? <Moon className="w-3 h-3 text-primary-foreground" /> : <Sun className="w-3 h-3 text-primary-foreground" />}
            </motion.div>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-bg text-primary-foreground text-xs flex items-center justify-center font-bold"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-glass overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <button
                  key={link}
                  onClick={() => scrollTo(link === "Shop" ? "products" : link.toLowerCase())}
                  className="text-left py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
