"use server"

import { apiServer } from "~/server/api"
import { signIn, signOut } from "~/server/auth"

import { type AdminLoginFormData, adminLoginSchema } from "~/types/auth"
import { type ActionResponse } from "~/types/shared"

export const adminLogin = async (data: AdminLoginFormData) => {
  const response = await apiServer.POST("/admin/login", {
    body: data,
  })

  return response
}

export async function submitLogout() {
  await signOut()
}

export async function submitAdminLogin(
  prevState: ActionResponse<AdminLoginFormData> | null,
  formData: FormData,
): Promise<ActionResponse<AdminLoginFormData>> {
  // Simulate network delay
  // await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    const rawData: AdminLoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validate the form data
    const validatedData = adminLoginSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    await signIn("credentials", {
      ...validatedData.data,
      redirect: false,
    })

    return {
      success: true,
      message: "Login Successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message ?? "Error",
    }
  }
}
