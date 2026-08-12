"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlistIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist from local storage", e);
      }
    }
  }, []);

  const saveWishlist = (newIds: string[]) => {
    setWishlistIds(newIds);
    localStorage.setItem("wishlist", JSON.stringify(newIds));
  };

  const toggleWishlist = (productId: string) => {
    let newIds;
    if (wishlistIds.includes(productId)) {
      newIds = wishlistIds.filter((id) => id !== productId);
    } else {
      newIds = [...wishlistIds, productId];
    }
    saveWishlist(newIds);
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
