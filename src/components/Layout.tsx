import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import CartDrawer from "./CartDrawer";
import PlugBot from "./PlugBot";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <FooterSection />
      <CartDrawer />
      <PlugBot />
    </div>
  );
};

export default Layout;
