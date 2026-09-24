import { networkInterfaces } from "node:os"

// This PC's current LAN IPv4 addresses (e.g. 192.168.x.x), read at startup so a new DHCP lease still works
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((a) => a && a.family === "IPv4" && !a.internal)
  .map((a) => a.address)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Served from https://rexced.github.io/Portfolio/ (must match the repo name exactly)
  basePath: "/Portfolio",
  // Fully static site in `out/` for GitHub Pages
  output: "export",
  // `/us` -> `/us/index.html`, which GitHub Pages serves without extra config
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Let other devices on the local network use `npm run dev` via http://<this PC's IP>:3000
  allowedDevOrigins: lanAddresses,
}

export default nextConfig
