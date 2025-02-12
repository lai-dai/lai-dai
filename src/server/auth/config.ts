import { User, type DefaultSession, type NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { apiServer } from "~/server/api"
import { AdminLoginFormData, LoginUser } from "~/types/auth"
import { type AdapterUser } from "next-auth/adapters"

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

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
        const response = await apiServer.POST("/admin/login", {
          body: credentials as unknown as AdminLoginFormData,
        })

        if (response.error) {
          throw new Error(response.error?.error?.message ?? "Lỗi")
        }

        return {
          ...response.data?.data.user,
          token: response.data?.data.token,
        } as unknown as User
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
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
    error: "/login",
  },
} satisfies NextAuthConfig
