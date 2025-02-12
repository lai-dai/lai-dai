/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// import { rehypeComponent } from "~/lib/rehype-component"
import "./src/env.js"
import type { NextConfig } from "next"
import createMDX from "@next/mdx"

/** @type {import("next").NextConfig} */
const config: NextConfig = {
  pageExtensions: ["mdx", "tsx"],

  // outputFileTracingIncludes: {
  //   "/**/*": ["./src/content/**/*"],
  // },

  // experimental: {
  //   mdxRs: true,
  // },

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

  transpilePackages: ["@tanstack/query-core"],
}

// const withMDX = createMDX({
//   extension: /\.(md|mdx)$/,

//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [rehypeComponent],
//   },
// })

const withMDX = createMDX()

export default withMDX(config)
