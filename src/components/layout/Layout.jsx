"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useLocale } from "@/lib/i18n/LocaleContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Layout({ children }) {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollToTop />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:font-semibold">
        {t("common.skipToContent")}
      </a>
      <Header />
      <CartDrawer />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
