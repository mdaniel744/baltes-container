"use client";

import Configurator from "@/screens/Configurator";
import { Suspense } from "react";

export default function QuoteRequestPage() {
  return <Suspense fallback={null}><Configurator /></Suspense>;
}
