/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dclaevazetcjjkrzczpc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "minmdhmltjguwoioatmi.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/resource-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
