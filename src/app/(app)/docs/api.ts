import type { TOCEntry } from "~/components/table-of-contents"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import React from "react"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
      `../../../content/docs/${slug}.mdx`
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
    path.join(__dirname, "../../../content/docs"),
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

export async function generateTableOfContentsFromMarkdown(markdown: string) {
  const headings = [
    // Match Markdown and HTML headings (e.g., ## Heading, <h2>Heading</h2>)
    ...markdown.matchAll(
      /^(#+)\s+(.+)$|^<h([1-6])(?:\s+[^>]*\bid=["'](.*?)["'][^>]*)?>(.*?)<\/h\3>/gm,
    ),
  ].map(match => {
    let level
    let text
    let slug

    if (match[1]) {
      // Markdown headings
      level = match[1].length
      text = match[2]?.trim().replaceAll("\\", "")
    } else {
      // HTML headings
      level = parseInt(match[3] ?? "1", 10) // Extract level from <hN>
      text = match[5]?.trim().replaceAll("\\", "")
      if (match[4]) {
        slug = `#${match[4]}`
      }
    }

    // Generate slug
    slug ??= `#${text
      ?.replace(/`([^`]+)`/g, "$1") // Remove inline code formatting
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .toLowerCase()}`

    return { level, text, slug, children: [] }
  })

  const toc: TOCEntry[] = []
  const stack: TOCEntry[] = [{ level: 0, text: "", slug: "", children: toc }]

  const containsQuickReference = markdown.match(/\<ApiTable\s+rows=\{\[/)
  if (containsQuickReference) {
    toc.push({
      level: 0,
      text: "Quick reference",
      slug: "#quick-reference",
      children: [],
    })
  }

  for (const heading of headings) {
    while (stack[stack.length - 1]!.level >= heading.level) stack.pop()
    stack[stack.length - 1]?.children.push(heading as TOCEntry)
    stack.push(heading as TOCEntry)
  }

  return toc
}
