import { type User, type DefaultSession, type NextAuthConfig } from "next-auth"
import { type AdapterUser } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import { admin } from "~/lib/api/index"
import { type LoginUser, type AdminLoginFormData } from "~/types/auth"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: LoginUser
  }

  interface User extends LoginUser {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        identifier: {},
        password: {},
      },
      async authorize(credentials) {
        const response = await admin.POST("/admin/login", {
          body: credentials as AdminLoginFormData,
        })

        if (response.data?.data) {
          return {
            ...response.data?.data.user,
            token: response.data?.data.token,
          } as unknown as User
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "signIn" && user) {
        Object.assign(token, user)
      }

      if (trigger === "update" && session) {
        Object.assign(token, session)
      }

      return token
    },
    session: async ({ token, session }) => {
      if (token && session.user) {
        session.user = token as unknown as AdapterUser & LoginUser
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
