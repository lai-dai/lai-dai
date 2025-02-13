/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { rehypeComponent } from "./src/lib/rehype-component"
import type { NextConfig } from "next"
import createMDX from "@next/mdx"

import "./src/env.js"

/** @type {import("next").NextConfig} */
const config: NextConfig = {
  pageExtensions: ["mdx", "tsx"],

  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },

  async redirects() {
    return [
      // Docs
      {
        source: "/docs",
        destination: "/docs/installation",
        permanent: false,
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,

  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeComponent],
  },
})

export default withMDX(config)
