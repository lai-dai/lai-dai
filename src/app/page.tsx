import { Metadata } from "next"
import Link from "next/link"
import React from "react"
import GridContainer from "~/components/grid-container"
import { SiteFooter } from "~/components/site-footer"
import { SiteHeader } from "~/components/site-header"
import { Button } from "~/components/ui/button"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "LaiDai",
}

export default function HomePage() {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="bg-background fixed inset-x-0 top-0 z-10 border-b border-dashed">
        <SiteHeader className="mx-auto max-w-7xl border-dashed xl:border-x" />
      </div>

      <div className="mx-auto min-h-dvh max-w-7xl border-dashed pt-6 md:pt-14 xl:border-x">
        <GridContainer className="mt-14 px-2 py-3 max-sm:px-4">
          <h1 className="text-balance text-4xl tracking-tighter max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-8xl">
            Hi! Mình là Lại Đài{" "}
            <span className={"wave select-none"}>{"👋"}</span>
          </h1>
        </GridContainer>

        <div className="mt-4 md:mt-9 md:space-y-2 px-4">
          <h3
            className={
              "whitespace-pre-line text-lg font-medium tracking-normal lg:text-4xl"
            }>
            {"Front-end Developer / Content Creator"}
          </h3>

          <p>{"Mình làm bằng tình yêu ❤️ và lòng biết ơn 🙏"}</p>
        </div>

        <GridContainer className="mt-4 md:mt-9 px-4 py-2">
          <div className="flex gap-3">
            <Button asChild={true} size={"sm"}>
              <Link href={"/docs"}>{"Get Started"}</Link>
            </Button>

            <Button asChild={true} size={"sm"} variant={"ghost"}>
              <Link href={"/my-components"}>{"My Components"}</Link>
            </Button>
          </div>
        </GridContainer>

        <div className="p-4">
          <h3 className={"text-lg"}>{"My Project"}</h3>

          <div className={"flex flex-col gap-3"}>
            <Link href={"/grammar"}>{"Grammar"}</Link>

            <Link href={"/menu"}>{"Menu"}</Link>
          </div>
        </div>
      </div>

      <GridContainer>
        <SiteFooter className="mx-auto max-w-7xl border-dashed xl:border-x" />
      </GridContainer>
    </div>
  )
}
