"use client"

import { Loader } from "lucide-react"
import * as React from "react"

import { Index } from "~/__examples__"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { cn } from "~/lib/utils"

const Registry = Index as Record<string, Record<string, unknown>>

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(
    children,
  ) as React.ReactElement<unknown>[]
  const Code = Codes[0]
  const Component = Registry[name]?.component as React.ElementType

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}>
      <Tabs className={"relative mr-auto w-full"} defaultValue={"preview"}>
        <div className={"flex items-center justify-between pb-3"}>
          {!hideCode && (
            <TabsList
              className={
                "w-full justify-start rounded-none border-b bg-transparent p-0"
              }>
              <TabsTrigger
                className={
                  "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                }
                value={"preview"}>
                {"Preview"}
              </TabsTrigger>

              <TabsTrigger
                className={
                  "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                }
                value={"code"}>
                {"Code"}
              </TabsTrigger>
            </TabsList>
          )}
        </div>

        <TabsContent className={"relative rounded-md border"} value={"preview"}>
          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              },
            )}>
            <React.Suspense
              fallback={
                <div
                  className={
                    "flex w-full items-center justify-center text-sm text-muted-foreground"
                  }>
                  <Loader className={"mr-2 h-4 w-4 animate-spin"} />

                  {"Loading..."}
                </div>
              }>
              {Component ? (
                <Component />
              ) : (
                <p className={"text-sm text-muted-foreground"}>
                  {"Component"}{" "}
                  <code
                    className={
                      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                    }>
                    {name}
                  </code>{" "}
                  {"not found in registry."}
                </p>
              )}
            </React.Suspense>
          </div>
        </TabsContent>

        <TabsContent value={"code"}>
          <div className={"flex flex-col space-y-4"}>
            <div
              className={
                "w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
              }>
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
