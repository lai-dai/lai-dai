"use client"

import { CheckCircle2 } from "lucide-react"
import Form from "next/form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import * as React from "react"
import { submitAdminLogin } from "~/actions/auth"

import { Alert, AlertDescription } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { type AdminLoginFormData } from "~/types/auth"
import { type ActionResponse } from "~/types/shared"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const initialState: ActionResponse<AdminLoginFormData> = {
  success: false,
  message: "",
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [state, action, isPending] = React.useActionState(
    submitAdminLogin,
    initialState,
  )

  React.useEffect(() => {
    // khi đăng nhập thành công
    if (session) {
      router.push("/")
    }
  }, [router, session])

  return (
    <Card className={"mx-auto w-full max-w-lg"}>
      <CardHeader>
        <CardTitle>{"Address Information"}</CardTitle>

        <CardDescription>
          {"Please enter your shipping address details below."}
        </CardDescription>
      </CardHeader>

      <CardContent>
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
                  placeholder={"123 Main St"}
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

                <Input
                  aria-describedby={"password-error"}
                  autoComplete={"password"}
                  className={state?.errors?.password ? "border-red-500" : ""}
                  id={"password"}
                  maxLength={100}
                  minLength={5}
                  name={"password"}
                  placeholder={"123 Main St"}
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
              {isPending ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
