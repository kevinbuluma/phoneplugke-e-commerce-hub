import { createContext, useContext, useState, ReactNode } from "react";

interface LoyaltyContextType {
  points: number;
  addPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(1250); // Start with some points for demo

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const redeemPoints = (amount: number) => {
    if (points >= amount) {
      setPoints((prev) => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <LoyaltyContext.Provider value={{ points, addPoints, redeemPoints }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
};
