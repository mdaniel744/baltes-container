import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import Providers from "@/app/providers";
import "@/index.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Baltes Container – Container kaufen seit 1983",
  description:
    "Baltes Container – seit 1983 Ihr Experte für neue und gebrauchte Container. Seecontainer, Lagercontainer, Kühlcontainer und individuelle Umbauten. Transparent beraten, deutschlandweit geliefert.",
  icons: {
    icon: { url: "/baltes-logo.png", type: "image/png" },
    apple: "/baltes-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} ${inter.variable} ${jetBrainsMono.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
