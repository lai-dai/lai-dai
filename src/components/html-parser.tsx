import parse, {
  attributesToProps,
  type DOMNode,
  domToReact,
  type HTMLReactParserOptions,
} from "html-react-parser"
import Image from "next/image"
import React from "react"
import { CopyButton } from "~/components/copy-button"
import { PhotoView } from "~/components/photo-view"
import { cn } from "~/lib/utils"
import { absoluteUrl } from "~/utils/url"

const options = {
  replace(domNode) {
    if (domNode.type !== "tag") {
      return domNode
    }

    const { className, ...props } = attributesToProps(domNode.attribs)
    props.children = domToReact(
      domNode.children as DOMNode[],
      options,
    ) as string

    switch (domNode.name) {
      case "h1":
        return (
          <h1
            {...props}
            className={cn(
              "font-heading mt-2 scroll-m-20 text-4xl font-bold",
              className,
            )}
          />
        )
      case "h2":
        return (
          <h2
            {...props}
            className={cn(
              "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
              className,
            )}
          />
        )
      case "h3":
        return (
          <h3
            {...props}
            className={cn(
              "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
              className,
            )}
          />
        )
      case "h4":
        return (
          <h4
            {...props}
            className={cn(
              "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
              className,
            )}
          />
        )
      case "h5":
        return (
          <h5
            {...props}
            className={cn(
              "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
              className,
            )}
          />
        )
      case "h6":
        return (
          <h6
            {...props}
            className={cn(
              "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
              className,
            )}
          />
        )
      case "p":
        return (
          <p
            {...props}
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
          />
        )
      case "ul":
        return (
          <ul
            {...props}
            className={cn("my-6 ml-6 list-disc", className)}
          />
        )
      case "ol":
        return (
          <ol
            {...props}
            className={cn("my-6 ml-6 list-decimal", className)}
          />
        )
      case "li":
        return <li
          {...props}
          className={cn("mt-2", className)}
        />
      case "blockquote":
        return (
          <blockquote
            {...props}
            className={cn("mt-6 border-l-2 pl-6 italic", className)}
          />
        )
      case "img":
        // hình ảnh ko có children
        delete props.children
        return (
          <PhotoView>
            <Image
              alt={""}
              height={500}
              width={500}
              {...props}
              className={cn("rounded-md", className)}
              src={absoluteUrl(props.src as string)}
            />
          </PhotoView>
        )
      case "hr":
        return <hr
          {...props}
          className={cn("my-4 md:my-8", className)}
        />
      case "table":
        return (
          <div className={"my-6 w-full overflow-y-auto"}>
            <table
              {...props}
              className={cn(
                "relative w-full overflow-hidden border-none text-sm",
                className,
              )}
            />
          </div>
        )
      case "tr":
        return (
          <tr
            {...props}
            className={cn("last:border-b-none m-0 border-b", className)}
          />
        )
      case "th":
        return (
          <th
            {...props}
            className={cn(
              "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
              className,
            )}
          />
        )
      case "td":
        return (
          <td
            {...props}
            className={cn(
              "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
              className,
            )}
          />
        )
      case "pre":
        const { __rawString__, ...preProps } = props
        return (
          <>
            <pre
              {...preProps}
              className={cn(
                "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
                className,
              )}
            />

            {__rawString__ && (
              <CopyButton
                className={cn("absolute right-4 top-4")}
                value={__rawString__ as string}
              />
            )}
          </>
        )
      case "code":
        return (
          <code
            className={cn(
              "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
              className,
            )}
            {...props}
          />
        )
    }
  },
} satisfies HTMLReactParserOptions

interface HtmlParserProps extends React.HTMLAttributes<HTMLDivElement> {
  html?: string
}

export const HtmlParser = React.forwardRef<HTMLDivElement, HtmlParserProps>(
  ({ html, ...props }, ref) => {
    if (!html) {
      return null
    }

    const reactComponent = parse(html ?? "", options)

    return (
      <div
        aria-label={"html-react-parser"}
        ref={ref}
        {...props}
      >
        {reactComponent}
      </div>
    )
  },
)
HtmlParser.displayName = "HtmlParser"
