"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/AuthContext";
import { queryClientInstance } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { CartProvider } from "@/lib/CartContext";

export default function Providers({ children }) {
  return (
    <LocaleProvider>
      <CartProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </CartProvider>
    </LocaleProvider>
  );
}
