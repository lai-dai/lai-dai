import fs from "node:fs/promises"
import path from "node:path"
import React from "react"
import { generateTableOfContentsFromMarkdown } from "~/utils/table-of-contents"

export async function getDocPageBySlug(
  slug: string,
): Promise<null | { Component: React.FC; title: string; description: string }> {
  try {
    // Check if the file exists
    if (
      !(await fs
        .stat(path.join(process.cwd(), "./src/content/docs", `${slug}.mdx`))
        .catch(() => false))
    ) {
      return null
    }

    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: Record<string, unknown> = await import(
      `~/content/docs/${slug}.mdx`
    )
    if (!module.default) {
      return null
    }

    return {
      Component: module.default as React.FC,
      title: module.title as string,
      description: module.description as string,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getDocPageSlugs() {
  const slugs = []
  for (const file of await fs.readdir(
    path.join(process.cwd(), "./src/content/docs"),
  )) {
    if (!file.endsWith(".mdx")) continue
    slugs.push(path.parse(file).name)
  }
  return slugs
}

export async function generateTableOfContents(slug: string) {
  // Check if the file exists
  if (
    !(await fs
      .stat(path.join(process.cwd(), "./src/content/docs", `${slug}.mdx`))
      .catch(() => false))
  ) {
    return []
  }

  const markdown = await fs.readFile(
    path.join(process.cwd(), "./src/content/docs", `${slug}.mdx`),
    "utf8",
  )

  return generateTableOfContentsFromMarkdown(markdown)
}
