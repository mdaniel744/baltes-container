"use client";

import { Suspense } from "react";
import Shop from "@/screens/Shop";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Shop />
    </Suspense>
  );
}
