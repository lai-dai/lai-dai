import {
  getCsrfToken,
} from "next-auth/react"

import {
  type LoginUser,
} from "~/types/auth"

export const updateSession = async (newSession: Partial<LoginUser>) => {
  return await fetch(
    "/api/auth/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        csrfToken: await getCsrfToken(),
        data: newSession,
      }),
    }
  )
}
