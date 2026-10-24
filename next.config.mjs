import fs from "node:fs";
import path from "node:path";

const linkedAppPath = path.join(process.cwd(), "base44", ".app.jsonc");

const readLinkedAppId = () => {
  try {
    const contents = fs.readFileSync(linkedAppPath, "utf8");
    const match = contents.match(/"id"\s*:\s*"([^"]+)"/);
    return match?.[1] ?? "";
  } catch {
    return "";
  }
};

const appId =
  process.env.NEXT_PUBLIC_BASE44_APP_ID ||
  process.env.VITE_BASE44_APP_ID ||
  process.env.BASE44_APP_ID ||
  readLinkedAppId();

const appBaseUrl =
  process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL ||
  process.env.VITE_BASE44_APP_BASE_URL ||
  process.env.BASE44_APP_BASE_URL ||
  "";

const functionsVersion =
  process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION ||
  process.env.VITE_BASE44_FUNCTIONS_VERSION ||
  "";

const proxyTarget = (
  process.env.BASE44_API_PROXY_TARGET || appBaseUrl
).replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE44_APP_ID: appId,
    NEXT_PUBLIC_BASE44_APP_BASE_URL: appBaseUrl,
    NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION: functionsVersion,
  },
  async rewrites() {
    if (!proxyTarget) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${proxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
