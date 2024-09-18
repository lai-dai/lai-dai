import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: number
    firstname: string
    lastname: string
    username: null | string
    email: string
    isActive: boolean
    blocked: boolean
    preferedLanguage: null | any
    createdAt: string
    updatedAt: string
    roles: {
      id: number
      name: string
      description: string
      code: string // strapi-super-admin
    }[]
    token: string
  }
  interface Session {
    user: User
  }
}
