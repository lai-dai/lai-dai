"use client"

import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { PasswordInput } from "~/components/password-input"

import { Alert, AlertDescription } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { type AdminLoginFormData, adminLoginSchema } from "~/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { adminLogin } from "~/actions/auth"

export function UserAuthLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/"

  const form = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = React.useCallback<SubmitHandler<AdminLoginFormData>>(
    async data => {
      try {
        await adminLogin(data)

        router.push(callbackUrl)
        router.refresh()
      } catch (error) {
        form.setError("root", {
          message: (error as Error).message ?? "Lỗi đăng nhập",
        })
      }
    },
    [callbackUrl, form, router],
  )

  return (
    <div className={"mx-auto w-full max-w-lg py-6"}>
      <Form {...form}>
        <div className={"space-y-6"}>
          <div className={"space-y-4"}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      aria-describedby={"email-error"}
                      autoComplete={"email"}
                      id={"email"}
                      maxLength={100}
                      minLength={5}
                      placeholder={"max@gmail.com"}
                      required={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      aria-describedby={"password-error"}
                      autoComplete={"password"}
                      id={"password"}
                      maxLength={100}
                      minLength={5}
                      placeholder={""}
                      required={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root ? (
            <Alert variant={"destructive"}>
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          ) : null}

          <Button
            onClick={() => form.handleSubmit(handleSubmit)()}
            className={"w-full"}
            isLoading={form.formState.isSubmitting}
            type={"button"}>
            {"Login"}
          </Button>
        </div>
      </Form>
    </div>
  )
}
