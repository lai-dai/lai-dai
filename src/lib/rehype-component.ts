import fs from "fs"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import path from "node:path"

import { Index } from "../__examples__"
import { type UnistNode, type UnistTree } from "~/types/unist"

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find(attribute => attribute.name === name)
}

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value
        if (!name) {
          return null
        }

        try {
          const component = Index[name as keyof typeof Index]
          const filePath = component.files[0]?.path

          // Read the source file.
          const source = fs.readFileSync(
            path.join(process.cwd(), filePath),
            // filePath,
            "utf8",
          )

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: filePath,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          )
        } catch (error) {
          console.error("59", (error as Error).message)
        }
      }
    })
  }
}
