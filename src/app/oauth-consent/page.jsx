"use client";

import { Suspense } from "react";
import OAuthConsent from "@/screens/OAuthConsent";

export default function OAuthConsentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <OAuthConsent />
    </Suspense>
  );
}
