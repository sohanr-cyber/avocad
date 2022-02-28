/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com","localhost"],
    loader: "imgix",
    path: "",
  },
}

module.exports = nextConfig
