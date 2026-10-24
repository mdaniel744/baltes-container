"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "baltes-container-cart";
const CartContext = createContext(null);

const clampQuantity = (quantity, product) => {
  const available = Number(product?.quantity);
  const maximum = Number.isFinite(available) && available > 0 ? available : 99;
  return Math.max(1, Math.min(Number(quantity) || 1, maximum));
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [isReady, items]);

  const addItem = useCallback((product, quantity = 1, options = {}) => {
    if (!product?.id && !product?.slug) return;

    const productKey = product.id || product.slug;
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => (item.product.id || item.product.slug) === productKey,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          (item.product.id || item.product.slug) === productKey
            ? {
                ...item,
                quantity: clampQuantity(item.quantity + quantity, product),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        { product, quantity: clampQuantity(quantity, product) },
      ];
    });

    if (options.open !== false) setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((productKey, quantity) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        (item.product.id || item.product.slug) === productKey
          ? { ...item, quantity: clampQuantity(quantity, item.product) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productKey) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => (item.product.id || item.product.slug) !== productKey,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + (Number(item.product.price_gross) || 0) * item.quantity,
        0,
      ),
      isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
