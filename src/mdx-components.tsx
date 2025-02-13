import React from "react"
import { CopyButton } from "~/components/copy-button"
import { PhotoView } from "~/components/photo-view"
import { cn } from "~/lib/utils"
import { absoluteUrl } from "~/utils/url"
import { ComponentPreview } from "~/components/component-preview"
import Image, { type ImageProps } from "next/image"
import { slugify } from "~/utils/slugify"
import Link from "next/link"
import { BuyMeACoffee } from "~/components/buy-me-a-coffee"
import { Callout } from "~/components/callout"
import { Icons } from "~/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { highlightCode } from "~/lib/highlight-code"

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (React.isValidElement(node)) {
    if (node.type === "small") {
      return ""
    }

    return getTextContent((node.props as React.PropsWithChildren).children)
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("")
  }

  return "" // If the node is neither text nor a React element
}

function createHeading({
  level,
  className: classNameProp,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}) {
  // eslint-disable-next-line react/display-name
  return ({
    children,
    className,
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const slug = slugify(getTextContent(children))

    return React.createElement(
      `h${level}`,
      { id: slug, className: cn(className, classNameProp) },
      [
        React.createElement(
          "a",
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: "anchor",
          },
          children,
        ),
      ],
    )
  }
}

const components = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className,
      )}
      {...props}
    />
  ),
  h2: createHeading({
    level: 2,
    className:
      "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
  }),
  h3: createHeading({
    level: 3,
    className:
      "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight step",
  }),
  h4: createHeading({
    level: 4,
    className:
      "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
  }),
  h5: createHeading({
    level: 5,
    className: "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
  }),
  h6: createHeading({
    level: 6,
    className: "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
  }),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
      className={cn(
        "my-6 ml-4 [&_li:before]:-ml-4 [&_li:before]:mr-3 [&_li:before]:content-['-']",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 rounded-lg border p-3 text-sm", className)}
      {...props}
    />
  ),
  img: ({ className, alt, src, ...props }: React.ComponentProps<"img">) => (
    <PhotoView>
      <Image
        alt={alt ?? ""}
        className={cn("rounded-md", className)}
        src={absoluteUrl(src)}
        {...props}
        width={300}
        height={300}
      />
    </PhotoView>
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className={"my-4 md:my-8"} {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className={"my-6 w-full overflow-y-auto"}>
      <table
        className={cn(
          "relative w-full overflow-hidden border-none text-sm",
          className,
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("last:border-b-none m-0 border-b", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),

  async pre(props: React.ComponentProps<"pre">) {
    const child = React.Children.only(props.children) as React.ReactElement
    if (!child) return null

    // eslint-disable-next-line prefer-const
    let { className, children: code } = child.props as {
      className: string
      children: string
    }
    const lang = className ? className.replace("language-", "") : ""
    // let filename = undefined

    // Extract `[!code filename:…]` directives from the first line of code
    // const lines = code.split("\n")
    // const filenameRegex = /\[\!code filename\:(.+)\]/
    // const match = lines[0].match(filenameRegex)
    // if (match) {
    //   filename = match[1]
    //   code = lines.splice(1).join("\n")
    // }

    const nodes = highlightCode({
      code,
      lang,
    })

    return (
      <div className="relative">
        <div className="mt-6 max-h-[650px] overflow-auto overflow-x-auto rounded-xl bg-zinc-950 *:!bg-transparent *:p-5 dark:bg-zinc-900 [&_.line:empty]:hidden [&_.line]:inline-block">
          {nodes}
        </div>

        {code && (
          <CopyButton className={"absolute right-4 top-4"} value={code} />
        )}
      </div>
    )
  },

  Image: ({ className, alt, src, ...props }: ImageProps) => (
    <PhotoView>
      <Image
        alt={alt ?? ""}
        className={cn("h-auto w-full rounded-md", className)}
        src={absoluteUrl(src)}
        {...props}
        width={300}
        height={300}
      />
    </PhotoView>
  ),

  summary: ({ className, ...props }: React.ComponentProps<"summary">) => (
    <summary
      className={cn("cursor-pointer font-medium", className)}
      {...props}
    />
  ),

  Steps: ({ ...props }) => (
    <div
      className={"steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"}
      {...props}
    />
  ),

  Link: ({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof Link>) => {
    const isTargetBlank =
      typeof props.href === "string" && props.href.startsWith("http")
    return (
      <Link
        target={isTargetBlank ? "_blank" : "_self"}
        className={cn(
          "font-medium underline underline-offset-4",
          isTargetBlank ? "text-blue-400" : "",
          className,
        )}
        {...props}>
        {children}

        {isTargetBlank ? (
          <span className={"inline-flex"}>
            <Icons.geist />
          </span>
        ) : null}
      </Link>
    )
  },
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className,
      )}
      {...props}
    />
  ),
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  ComponentPreview,
  BuyMeACoffee,
  Callout,
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
