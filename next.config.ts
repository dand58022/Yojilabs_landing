import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Concept demos aren't products yet; their slugs land on the index.
      { source: "/demos/bookings-website", destination: "/demos", permanent: true },
      { source: "/demos/operations-dashboard", destination: "/demos", permanent: true },
    ];
  },
};

export default nextConfig;
