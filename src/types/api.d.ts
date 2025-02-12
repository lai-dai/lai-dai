import { type components, type operations, type paths } from "./strapi"
import { type AdminLoginFormData } from "./auth"

export interface ClientPaths extends paths {
  "/grammar-lessons/all-slugs": {
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

export interface AdminPaths {
  "/admin/login": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: AdminOperations["post/admin/login"]
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}

interface AdminComponents {
  schemas: {
    AdminLoginRequest: AdminLoginFormData
    AdminLoginResponse: {
      data: {
        token: string
        user: {
          id: number
          documentId: string
          firstname: string
          lastname: string
          username: string
          email: string
          isActive: true
          blocked: false
          preferedLanguage: null
          createdAt: string
          updatedAt: string
          publishedAt: string
          locale: string
        }
      }
    }
  }
}

interface AdminOperations {
  "post/admin/login": {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        "application/json": AdminComponents["schemas"]["AdminLoginRequest"]
      }
    }
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": AdminComponents["schemas"]["AdminLoginResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["Error"]
        }
      }
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["Error"]
        }
      }
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["Error"]
        }
      }
      /** @description Not Found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["Error"]
        }
      }
      /** @description Internal Server Error */
      500: {
        headers: {
          [name: string]: unknown
        }
        content: {
          "application/json": components["schemas"]["Error"]
        }
      }
    }
  }
}
