import * as React from "react"

export const Index = {
  "button-demo": {
    name: "button-demo",
    description: "",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "src/demo/button-demo.tsx",
        type: "registry:example",
        target: "",
      },
    ],
    component: React.lazy(() => import("src/demo/button-demo")),
    source: "",
    category: "",
    subcategory: "",
    chunks: [],
  },
} as const
