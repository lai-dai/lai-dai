import * as React from "react"

export const Index = {
  "button-demo": {
    name: "button-demo",
    path: "src/examples/button-demo.tsx",
    component: React.lazy(() => import("~/examples/button-demo")),
  },
} as const
