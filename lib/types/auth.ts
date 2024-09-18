import { User } from 'next-auth'

export type GitHubAccount = {
  name: string
  email: string
  picture: string
  sub: string
}

export type GoogleAccount = {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  id_token: string
  expires_at: number
  provider: string
  type: string
  providerAccountId: string
}

export type CredentialsAccount = {
  token: string
  user: Omit<User, 'token'>
}
