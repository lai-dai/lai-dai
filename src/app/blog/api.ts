"use server"

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type Meta = {
  title: string
  date: string
  excerpt: React.ReactElement
  authors: []
  description: string
  image?: {
    src: string
  }
  private?: boolean
}

export async function getBlogPostBySlug(slug: string): Promise<{
  Component: React.FC
  meta: Meta
  slug: string
} | null> {
  try {
    // Check if the file exists
    if (
      !(await fs
        .stat(path.join(__dirname, `../../content/blog/${slug}/index.mdx`))
        .catch(() => null))
    ) {
      return null
    }

    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: Record<string, unknown> = await import(
      `../../content/blog/${slug}/index.mdx`
    )
    if (!module.default) {
      return null
    }

    return {
      Component: module.default as React.FC,
      meta: {
        authors: [],
        ...(module.meta as Omit<Meta, "authors">),
      },
      slug,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const posts: { slug: string; date: number }[] = []

  const folders = await fs.readdir(
    path.join(__dirname, "../../content/blog"),
  )

  await Promise.allSettled(
    folders.map(async folder => {
      if (folder.startsWith(".")) return
      try {
        const post = await getBlogPostBySlug(folder)
        if (!post) return

        posts.push({
          slug: post.slug,
          date: new Date(post.meta.date).getTime(),
        })
      } catch (e) {
        console.error(e)
      }
    }),
  )

  // posts.sort((a, b) => b.date - a.date)

  return posts.map(post => post.slug)
}
