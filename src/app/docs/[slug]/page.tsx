import { notFound } from "next/navigation"
import React from "react"
import TableOfContents from "~/components/table-of-contents"
import {
  generateTableOfContents,
  getDocPageBySlug,
  getDocPageSlugs,
} from "../api"
import { Metadata } from "next/types"

export const dynamic = "force-static"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getDocPageSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const post = await getDocPageBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const title = post.title

  return {
    metadataBase: new URL("https://tailwindcss.com"),
    title,
    description: post.description,
    openGraph: {
      title,
      description: post.description,
      type: "article",
      url: `/docs/${params.slug}`,
      images: [{ url: `/api/og?path=/docs/${params.slug}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [{ url: `/api/og?path=/docs/${params.slug}` }],
      site: "@tailwindcss",
      creator: "@tailwindcss",
    },
  }
}

export default async function DocPage(props: Props) {
  const params = await props.params

  const [post, tableOfContents] = await Promise.all([
    getDocPageBySlug(params.slug),
    generateTableOfContents(params.slug),
  ])

  if (!post) {
    return notFound()
  }

  return (
    <>
      {/* Add a placeholder div so the Next.js router can find the scrollable element. */}
      <div hidden />

      <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-10 xl:max-w-5xl">
        <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
          <h1
            data-title="true"
            className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
            {post.title}
          </h1>
          <p
            data-description="true"
            className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
            {post.description}
          </p>

          <div className="mt-10" data-content="true">
            <post.Component />
          </div>
        </div>
        <div className="max-xl:hidden">
          <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
            <TableOfContents tableOfContents={tableOfContents} />
          </div>
        </div>
      </div>
    </>
  )
}
