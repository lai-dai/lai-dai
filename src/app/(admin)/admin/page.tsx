import React from "react"
import { auth } from "~/server/auth"

export default async function NamePage() {
  const session = await auth()
  console.log("🚀 NamePage", session)
  return <div>admin</div>
}
