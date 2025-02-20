import { createHighlighter } from "shiki"
import type { CodeToHastOptions } from "shiki/bundle/web"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import React, { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"

const highlighter = createHighlighter({
  themes: ["github-dark-dimmed"],
  langs: [
    "css",
    "html",

    "javascript",
    "js",
    "jsx",

    "json",

    "md",
    "mdx",

    "ts",
    "tsx",

    "sh",
    "diff",
    "console",
  ],
})

export const highlightCode = React.cache(
  async ({
    code,
    ...props
  }: Omit<CodeToHastOptions, "theme"> & {
    code: string
  }) => {
    const codeWithoutPrettierIgnore = code
      .split("\n")
      .filter(line => !line.includes("prettier-ignore"))
      .join("\n")

    const tree = (await highlighter).codeToHast(codeWithoutPrettierIgnore, {
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
      ...props,
    })

    return toJsxRuntime(tree, {
      Fragment,
      jsx,
      jsxs,
    })
  },
)
