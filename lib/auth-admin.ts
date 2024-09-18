import NextAuth, { getServerSession, NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { env } from '@/lib/env'

import { apiServer } from './api-server'
import { QUERY_KEYS } from './constants/query-key'
import { CredentialsAccount } from './types/auth'
import { getErrorMessage } from './utils/error-message'

const cookiePrefix = 'auth.admin'

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
                try {
                  if (!user?.token) {
                    throw new Error('Not token')
                  }
                  const { data } = await apiServer.get<{ data: User }>(
                    QUERY_KEYS.meAdmin,
                    {
                      headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                    }
                  )

                  token.id = data.id
                  token.firstname = data.firstname
                  token.lastname = data.lastname
                  token.username = data.username
                  token.email = data.email
                  token.isActive = data.isActive
                  token.blocked = data.blocked
                  token.preferedLanguage = data.preferedLanguage
                  token.createdAt = data.createdAt
                  token.updatedAt = data.updatedAt
                  token.roles = data.roles

                  token.token = user.token
                } catch (error) {
                  console.error('💥 error', error)
                }
              }
              break
          }
          break

        case 'update':
          if (session.name) token.name = session.name
          if (session.email) token.email = session.email

          break
      }

      return token
    },
    async session({ session, token: _token }) {
      if (session.user && _token) {
        const token = _token as any

        session.user.id = token.id
        session.user.firstname = token.firstname
        session.user.lastname = token.lastname
        session.user.username = token.username
        session.user.email = token.email
        session.user.isActive = token.isActive
        session.user.blocked = token.blocked
        session.user.preferedLanguage = token.preferedLanguage
        session.user.createdAt = token.createdAt
        session.user.updatedAt = token.updatedAt
        session.user.roles = token.roles
        session.user.token = token.token
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
          const { data } = await apiServer.post<{ data: CredentialsAccount }>(
            QUERY_KEYS.loginAdmin,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          )

          const { token, user } = data
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

export const authAdmin = () => getServerSession(authOptions)
