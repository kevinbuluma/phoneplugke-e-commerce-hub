import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { ShoppingCart, Star, Award, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addPoints } = useLoyalty();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button onClick={() => navigate("/shop")} className="text-primary hover:underline">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const earnedPoints = Math.floor(product.price * 0.01);
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 pt-12 md:pt-24">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
        {/* Product Image */}
        <div className="glass-card p-4 rounded-3xl overflow-hidden flex items-center justify-center bg-card/30">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full max-w-md h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-sm text-primary font-semibold uppercase tracking-wider">{product.brand}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-secondary text-secondary" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                {product.condition}
              </span>
              {product.storage && (
                <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                  {product.storage}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="font-display text-4xl font-bold text-foreground">
              KES {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through mb-1">
                KES {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="glass-card-subtle p-4 rounded-2xl mb-8 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Loyalty Rewards</h4>
              <p className="text-sm text-muted-foreground">You will earn <strong className="text-primary">{earnedPoints} pts</strong> by purchasing this item. Points can be redeemed for future discounts.</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-glass">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <div className="text-sm">
                <p className="font-semibold">Warranty</p>
                <p className="text-muted-foreground">1 Year</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-glass">
              <Truck className="w-6 h-6 text-blue-500" />
              <div className="text-sm">
                <p className="font-semibold">Delivery</p>
                <p className="text-muted-foreground">Nationwide</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              addItem(product);
              addPoints(earnedPoints);
            }}
            disabled={!product.inStock}
            className="w-full py-4 rounded-2xl gradient-bg text-primary-foreground font-bold text-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2 mt-auto"
          >
            <ShoppingCart className="w-5 h-5" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Related Suggestions */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You might also <span className="gradient-text">like</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
