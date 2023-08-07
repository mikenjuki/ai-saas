/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/video",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/code",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
