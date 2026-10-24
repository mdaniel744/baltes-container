"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";

function AuthRequiredRedirect({ navigateToLogin }) {
  useEffect(() => {
    navigateToLogin();
  }, [navigateToLogin]);

  return null;
}

export default function AppGate({ children }) {
  const {
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    navigateToLogin,
  } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authError?.type === "user_not_registered") {
    return <UserNotRegisteredError />;
  }

  if (authError?.type === "auth_required") {
    return <AuthRequiredRedirect navigateToLogin={navigateToLogin} />;
  }

  return children;
}
