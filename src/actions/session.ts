import { getCsrfToken } from "next-auth/react"
import React from "react"
import { type LoginUser } from "~/types/auth"

export const updateSession = React.cache(
  async (newSession: Partial<LoginUser>) => {
    const csrfToken = await getCsrfToken()

    return await fetch("/api/auth/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        csrfToken,
        data: newSession,
      }),
    })
  },
)

export const getSession = React.cache(async () => {
  return await fetch("/api/auth/session")
})
