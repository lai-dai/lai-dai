import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Icons } from "~/components/icons"
import { UserAuthForm } from "~/components/auth/login/user-auth-form"
import { auth } from "~/server/auth"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  return (
    <>
      <div className={"border-grid flex-1 border-b"}>
        <div className={"container-wrapper h-full"}></div>
      </div>

      <div className={"border-grid border-b"}>
        <div className={"container-wrapper"}>
          <div className={"container py-6"}>
            <div className={"mx-auto flex flex-col space-y-2 text-center"}>
              <Icons.logo className={"mx-auto h-6 w-6"} />

              <h1 className={"text-2xl font-semibold tracking-tight"}>
                {"Welcome back"}
              </h1>

              <p className={"text-sm text-muted-foreground"}>
                {"Enter your email to sign in to your account"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={"border-grid border-b"}>
        <div className={"container-wrapper"}>
          <div className={"container sm:w-[350px]"}>
            <UserAuthForm />
          </div>
        </div>
      </div>

      <div className={"border-grid border-b"}>
        <div className={"container-wrapper"}>
          <div className={"container py-6"}>
            <p className={"px-8 text-center text-sm text-muted-foreground"}>
              <Link
                className={"hover:text-brand underline underline-offset-4"}
                href={"/register"}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className={"flex-1"}>
        <div className={"container-wrapper h-full"}></div>
      </div>
    </>
  )
}
