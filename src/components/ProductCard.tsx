import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const { addPoints } = useLoyalty();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const earnedPoints = Math.floor(product.price * 0.01);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card overflow-hidden hover-lift group flex flex-col h-full"
    >
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer" 
        onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0,0); }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm z-10">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
            <span className="text-foreground font-semibold">Out of Stock</span>
          </div>
        )}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center gap-3 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0,0); }}
            className="p-3 rounded-xl bg-card/80 border border-glass text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              addItem(product);
              addPoints(earnedPoints);
            }}
            disabled={!product.inStock}
            className="p-3 rounded-xl gradient-bg text-primary-foreground disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-end gap-2 mt-auto">
          <span className="font-display font-bold text-lg text-foreground">
            KES {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              KES {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.storage && (
            <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
              {product.storage}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
            <Award className="w-3 h-3" />
            Earn {earnedPoints} pts
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
