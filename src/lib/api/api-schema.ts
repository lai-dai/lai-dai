import { type operations, type paths } from "~/lib/api/strapi"

export type Paths = paths & {
  "/grammar-lesson/all-slugs": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: operations["get/grammar-lessons"]
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
