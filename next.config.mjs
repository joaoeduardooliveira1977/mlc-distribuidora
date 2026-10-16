/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Página antiga do Kit Natal, substituída pela página única de produto.
      {
        source: "/produto/tag-natal",
        destination: "/produto/tag-natal-perola-6mm",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
