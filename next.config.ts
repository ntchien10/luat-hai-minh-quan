import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true, // Bắt buộc khi dùng static export để Next/Image không đòi hỏi server Node.js tối ưu ảnh
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "luatvanbao.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https: blob: http://translate.google.com https://translate.google.com https://translate.googleapis.com https://www.gstatic.com; font-src 'self' data: https:; frame-src 'self' https://www.google.com https://maps.google.com https://translate.google.com https://translate.googleapis.com; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;