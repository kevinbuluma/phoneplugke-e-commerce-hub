import { useState } from "react";
import { motion } from "framer-motion";
import { products, brands, conditions } from "@/data/products";
import ProductCard from "@/components/ProductCard";

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
