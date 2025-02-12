import * as React from "react"

export const Index = {
  "button-demo": {
    name: "button-demo",
    files: [
      {
        path: "src/components/examples/button-demo.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(() => import("../examples/button-demo")),
  },
} as const
