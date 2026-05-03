import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductsSection from "@/components/ProductsSection";
import FlashDealsSection from "@/components/FlashDealsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import CartDrawer from "@/components/CartDrawer";
import PlugBot from "@/components/PlugBot";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <CategoriesSection />
    <ProductsSection />
    <FlashDealsSection />
    <AboutSection />
    <ContactSection />
    <FooterSection />
    <CartDrawer />
    <PlugBot />
  </div>
);

export default Index;
