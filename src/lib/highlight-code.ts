"use server"

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { createHighlighter } from "shiki"

const highlighter = await createHighlighter({
  themes: ["github-dark-dimmed"],
  langs: [
    "astro",
    "blade",
    "css",
    "edge",
    "elixir",
    "hbs",
    "html",
    "js",
    "json",
    "jsx",
    "mdx",
    "sh",
    "svelte",
    "ts",
    "tsx",
    "twig",
    "vue",
    "md",
    "diff",
    "console",
  ],
})

export async function highlightCode({
  code,
  lang,
}: {
  code: string
  lang: string
}) {
  const codeWithoutPrettierIgnore = code
    .split("\n")
    .filter(line => !line.includes("prettier-ignore"))
    .join("\n")

  const html = highlighter.codeToHtml(codeWithoutPrettierIgnore, {
    lang: lang,
    theme: "github-dark-dimmed",
    transformers: [
      transformerNotationHighlight({
        matchAlgorithm: "v3",
        classActiveLine: "border-l-2 border-sky-400 bg-sky-300/15 pl-5 -ml-5",
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: "v3",
        classActiveWord: "px-1 py-0.5 bg-sky-300/15",
      }),
      transformerNotationDiff({
        matchAlgorithm: "v3",
        classLineAdd:
          "relative pl-4 -ml-5 border-l-4 border-teal-400 bg-teal-300/15 before:absolute before:left-2 before:text-teal-400 before:content-['+']",
        classLineRemove:
          "relative pl-4 -ml-5 border-l-4 border-red-400 bg-red-300/15 before:absolute before:left-2 before:text-red-400 before:content-['-']",
      }),
    ],
  })

  return html
}
