import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { env } from '@/lib/env'

import { api } from './api'
import { QUERY_KEYS } from './constants/query-key'
import { CredentialsAccount } from './types/auth'
import { ResFindOne } from './types/common'
import { getErrorMessage } from './utils/error-message'

const cookiePrefix = 'auth'

export const authOptions = {
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `${cookiePrefix}.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: 900,
      },
    },
    state: {
      name: `${cookiePrefix}.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: 900,
      },
    },
    nonce: {
      name: `${cookiePrefix}.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  pages: {
    signIn: '/admin/login',
    signOut: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, account, trigger, user, session }) {
      switch (trigger) {
        case 'signIn':
          switch (account?.provider) {
            case 'google':
              break

            case 'credentials':
              if (user) {
                token.role = user.role
                token.active = user.active
                token.createdAt = user.createdAt
                token.image = user.image
                token.provider = user.provider
                token.createdAt = user.createdAt
                token.updatedAt = user.updatedAt
                token.token = user.token
                token.tokenExpires = user.tokenExpires
              }
              break
          }
          break
        case 'update':
          if (session.image) token.image = session.image
          if (session.name) token.name = session.name
          if (session.email) token.email = session.email

          break
      }

      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as string
      }

      if (session.user) {
        session.user.role = token.role as string
        session.user.active = token.active as boolean
        session.user.createdAt = token.createdAt as string
        session.user.provider = token.provider as string
        session.user.createdAt = token.createdAt as string
        session.user.updatedAt = token.updatedAt as string
        session.user.token = token.token as string
        session.user.tokenExpires = token.tokenExpires as string
        session.user.image = token.image as string
      }

      return session
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await api.post<ResFindOne<CredentialsAccount>>(
            QUERY_KEYS.login,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          )
          const { token, user } = res.data
          return { ...user, token }
        } catch (error) {
          console.error('💥 error', error)
          throw new Error(getErrorMessage(error))
        }
      },
    }),
  ],
} satisfies NextAuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export const auth = () => getServerSession(authOptions)
