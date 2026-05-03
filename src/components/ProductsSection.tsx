import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { products, brands, conditions } from "@/data/products";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card overflow-hidden hover-lift group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-foreground font-semibold">Out of Stock</span>
          </div>
        )}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          <button className="p-3 rounded-xl bg-card/80 border border-glass text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="p-3 rounded-xl gradient-bg text-primary-foreground disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-display font-bold text-lg text-foreground">
            KES {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              KES {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.storage && (
          <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
            {product.storage}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");

  const filtered = products.filter(p => {
    if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
    if (selectedCondition !== "All" && p.condition !== selectedCondition) return false;
    return true;
  });

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Our <span className="gradient-text">Collection</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-10">Discover the latest smartphones & accessories</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          <div className="flex gap-2 flex-wrap justify-center">
            {brands.map(b => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedBrand === b
                    ? "gradient-bg text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {conditions.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCondition(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCondition === c
                    ? "gradient-bg text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No products match your filters.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
