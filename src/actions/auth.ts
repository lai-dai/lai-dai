"use server"

import { signIn } from "~/server/auth"

import { type AdminLoginFormData } from "~/types/auth"

export const adminLogin = async (data: AdminLoginFormData) => {
  const response = await signIn("credentials", {
    ...data,
  })

  return response
}
