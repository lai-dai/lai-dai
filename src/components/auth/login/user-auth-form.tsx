"use client"

import { CheckCircle2 } from "lucide-react"
import Form from "next/form"
import * as React from "react"
import { submitAdminLogin } from "~/actions/auth"
import { PasswordInput } from "~/components/password-input"

import { Alert, AlertDescription } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { type AdminLoginFormData } from "~/types/auth"
import { type ActionResponse } from "~/types/shared"

const initialState: ActionResponse<AdminLoginFormData> = {
  success: false,
  message: "",
}

export function UserAuthForm() {
  const [state, action, isPending] = React.useActionState(
    submitAdminLogin,
    initialState,
  )

  React.useEffect(() => {
    // khi đăng nhập thành công
    if (state.success) {
      // router.push("/")
      window.location.href = "/"
    }
  }, [state.success])

  return (
    <div className={"mx-auto w-full max-w-lg py-6"}>
      <Form
        action={action}
        autoComplete={"on"}
      >
          <div className={"space-y-6"}>
            <div className={"space-y-4"}>
              <div className={"space-y-2"}>
                <Label htmlFor={"email"}>{"Email"}</Label>

                <Input
                  aria-describedby={"email-error"}
                  autoComplete={"email"}
                  className={state?.errors?.email ? "border-red-500" : ""}
                  id={"email"}
                  maxLength={100}
                  minLength={5}
                  name={"email"}
                  placeholder={"max@gmail.com"}
                  required={true}
                />

                {state?.errors?.email && (
                  <p
                    className={"text-sm text-red-500"}
                    id={"email-error"}
                  >
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div className={"space-y-2"}>
                <Label htmlFor={"password"}>{"Password"}</Label>

                <PasswordInput
                  aria-describedby={"password-error"}
                  autoComplete={"password"}
                  className={state?.errors?.password ? "border-red-500" : ""}
                  id={"password"}
                  maxLength={100}
                  minLength={5}
                  name={"password"}
                  placeholder={""}
                  required={true}
                />

                {state?.errors?.password && (
                  <p
                    className={"text-sm text-red-500"}
                    id={"password-error"}
                  >
                    {state.errors.password}
                  </p>
                )}
              </div>
            </div>

            {state?.message && (
              <Alert variant={state.success ? "default" : "destructive"}>
                {state.success && <CheckCircle2 className={"h-4 w-4"} />}

                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <Button
              className={"w-full"}
              isLoading={isPending}
              type={"submit"}
            >
              {"Login"}
            </Button>
          </div>
        </Form>
    </div>
  )
}
