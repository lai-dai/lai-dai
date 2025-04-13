import fs from "node:fs/promises"
import path from "node:path"
import React from "react"
import { generateTableOfContentsFromMarkdown } from "~/utils/table-of-contents"

type Meta = {
  title: string
  sub_title: string
  description?: string
  private?: boolean
  order: number
  level: number
  level_title: string
}

type Grammar = {
  meta: Meta
  slug: string
  Component: React.FC
}

const basePath = "src/content/english/grammar"

export async function getGrammarBySlug(slug: string): Promise<Grammar | null> {
  try {
    // Check if the file exists
    if (
      !(await fs
        .stat(path.join(process.cwd(), basePath, `${slug}.mdx`))
        .catch(() => false))
    ) {
      return null
    }

    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: Record<string, unknown> = await import(
      `~/content/english/grammar/${slug}.mdx`
    )

    if (!module.default) {
      return null
    }

    return {
      Component: module.default as React.FC,
      meta: module.meta as Meta,
      slug,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getGrammarSlugs() {
  const slugs = []
  for (const file of await fs.readdir(path.join(process.cwd(), basePath))) {
    if (!file.endsWith(".mdx")) continue
    slugs.push(path.parse(file).name)
  }
  return slugs
}

export async function generateTableOfContents(slug: string) {
  // Check if the file exists
  if (
    !(await fs
      .stat(path.join(process.cwd(), basePath, `${slug}.mdx`))
      .catch(() => false))
  ) {
    return []
  }

  const markdown = await fs.readFile(
    path.join(process.cwd(), basePath, `${slug}.mdx`),
    "utf8",
  )

  return generateTableOfContentsFromMarkdown(markdown)
}
