import AppGate from "@/components/AppGate";
import SiteLayout from "@/components/layout/Layout";

export default function PublicSiteLayout({ children }) {
  return (
    <AppGate>
      <SiteLayout>{children}</SiteLayout>
    </AppGate>
  );
}
