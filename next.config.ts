import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server work from the phone on the same Wi-Fi as well.
  allowedDevOrigins: ["192.168.*.*"],

  // The dev badge sits on top of the "আগের" button, so it stays off.
  devIndicators: false,
};

export default nextConfig;
