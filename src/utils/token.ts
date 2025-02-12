import { md5 } from "~/lib/crypto"

export const getDefaultAccessKey = (data?: string) => {
  const today = new Date().toISOString().split("T")[0]

  return md5(`${data ?? ""}${today}`)
}
