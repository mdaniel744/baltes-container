"use client";

import { Suspense } from "react";
import ResetPassword from "@/screens/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResetPassword />
    </Suspense>
  );
}
