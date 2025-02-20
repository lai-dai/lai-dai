/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  User,
  type DefaultSession,
  type NextAuthConfig,
  CredentialsSignin,
} from "next-auth"
import "next-auth/jwt"

import CredentialsProvider from "next-auth/providers/credentials"
import { adminApi } from "~/lib/api"
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
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const response = await adminApi.POST("/admin/login", {
          body: credentials as AdminLoginFormData,
        })

        if (response.error) {
          throw new CredentialsSignin(response.error?.error?.message ?? "Lỗi")
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
