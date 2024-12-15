import { serialize } from "next-mdx-remote/serialize"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from 'remark-math'
import { visit } from "unist-util-visit"
import { rehypeComponent } from "~/lib/rehype-component"

export async function mdxSerialize(source: string) {
  return serialize(
    // Raw MDX contents as a string
    source,
    // Optional parameters
    {
      // made available to the arguments of any custom MDX component
      scope: {},
      // MDX's available options, see the MDX docs for more info.
      // https://mdxjs.com/packages/mdx/#compilefile-options
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          rehypeComponent,
          () => tree => {
            visit(tree, node => {
              if (node?.type === "element" && node?.tagName === "pre") {
                const [codeEl] = node.children
                if (codeEl.tagName !== "code") {
                  return
                }
                node.__rawString__ = codeEl.children?.[0].value
              }
            })
          },
          [
            rehypePrettyCode,
            {
              keepBackground: false,
              theme: "github-dark-dimmed",
              onVisitLine(node) {
                // Prevent lines from collapsing in `display: grid` mode, and allow empty
                // lines to be copy/pasted
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }]
                }
              },
              onVisitHighlightedLine(node) {
                node.properties.className = ["line--highlighted"]
              },
              onVisitHighlightedChars(node) {
                node.properties.className = ["chars--highlighted"]
              },
            } satisfies RehypePrettyCodeOptions,
          ],
          () => tree => {
            visit(tree, node => {
              if (node?.type === "element" && node?.tagName === "figure") {
                if (!("data-rehype-pretty-code-figure" in node.properties)) {
                  return
                }

                const preElement = node.children.at(-1)
                if (preElement.tagName !== "pre") {
                  return
                }

                preElement.properties.__rawString__ = node.__rawString__
              }
            })
          },
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
        ],
        format: "mdx",
      },
      // Indicates whether or not to parse the frontmatter from the MDX source
      parseFrontmatter: false,
    },
  )
}
