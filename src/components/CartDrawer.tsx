import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-glass z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-glass">
              <h2 className="font-display text-xl font-bold text-foreground">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-4xl mb-3">🛒</p>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card-subtle p-4 flex gap-4"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-foreground truncate">{item.name}</h4>
                      <p className="text-sm text-primary font-bold">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-glass space-y-4">
                <div className="flex justify-between text-lg font-display font-bold text-foreground">
                  <span>Total</span>
                  <span>KES {totalPrice.toLocaleString()}</span>
                </div>
                <button className="w-full py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg glow-pink">
                  Checkout — M-Pesa / Card
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-3 rounded-2xl border border-glass text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
