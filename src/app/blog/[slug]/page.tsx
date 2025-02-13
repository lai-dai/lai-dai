import { notFound } from "next/navigation"
import React from "react"
import { getBlogPostBySlug, getBlogPostSlugs } from "../api"
import { Metadata } from "next"
import { formatDate } from "~/utils/formats"

export const dynamic = "force-static"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  return {
    metadataBase: new URL("https://tailwindcss.com"),
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      url: `/blog/${params.slug}`,
      images: [
        {
          url: post.meta.image
            ? post.meta.image.src
            : `/api/og?path=/blog/${params.slug}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [
        {
          url: post.meta.image
            ? post.meta.image.src
            : `/api/og?path=/blog/${params.slug}`,
        },
      ],
      site: "@tailwindcss",
      creator: "@tailwindcss",
    },
  }
}

export default async function DocPage(props: Props) {
  const params = await props.params
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <>
      {/* Add a placeholder div so the Next.js router can find the scrollable element. */}
      <div hidden />

      <div className="">
        <div className="col-start-2 row-span-2 border-r border-l border-gray-950/5 max-xl:hidden dark:border-white/10"></div>

        <div className="max-xl:mx-auto max-xl:w-full max-xl:max-w-(--breakpoint-md)">
          <div className="mt-16 px-4 font-mono text-sm/7 font-medium tracking-widest text-gray-500 uppercase lg:px-2">
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
          </div>

          <div className="mb-6 px-4 lg:px-2 xl:mb-16">
            <h1 className="inline-block max-w-(--breakpoint-md) text-[2.5rem]/10 tracking-tight text-pretty text-gray-950 max-lg:font-medium lg:text-6xl dark:text-gray-200">
              {post.meta.title}
            </h1>
          </div>
        </div>

        <div className="px-4 py-2 lg:px-2">
          <article className="max-w-(--breakpoint-md)">
            <post.Component />
          </article>
        </div>
      </div>
    </>
  )
}
