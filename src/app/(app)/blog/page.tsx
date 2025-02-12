import { Metadata } from "next"
import Link from "next/link"
import React from "react"
import { getBlogPostBySlug, getBlogPostSlugs } from "~/app/(app)/blog/api"
import { nonNullable } from "~/utils/ables"
import { formatDate } from "~/utils/formats"

export const metadata: Metadata = {
  title: "Blog",
  description: "All the latest Tailwind CSS news, straight from the team.",
  openGraph: {
    type: "article",
    title: "Latest updates - Blog",
    description: "All the latest Tailwind CSS news, straight from the team.",
    images: "https://tailwindcss.com/api/og?path=/blog",
    url: "https://tailwindcss.com/blog",
  },
}

export default async function MdxPage() {
  const slugs = await getBlogPostSlugs()
  const posts = (await Promise.all(slugs.map(getBlogPostBySlug)))
    .filter(nonNullable)
    .filter(post => !post.meta.private)

  return (
    <div className="mt-12 mb-46 grid grid-cols-1 lg:grid-cols-[24rem_2.5rem_minmax(0,1fr)]">
      {posts.map(({ meta, slug }, index) => (
        <React.Fragment key={slug}>
          <div className="p col-span-3 grid grid-cols-subgrid divide-x divide-gray-950/5 dark:divide-white/10">
            <div className="px-2 font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase max-lg:hidden">
              {formatDate(meta.date)}
            </div>
            <div className="max-lg:hidden" />
            <div className="text-md px-2">
              <div className="max-w-(--container-2xl)">
                <div className="mb-4 font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase lg:hidden">
                  {formatDate(meta.date)}
                </div>

                <Link
                  href={`/blog/${slug}`}
                  className="font-semibold">
                  {meta.title}
                </Link>
                <div className="prose prose-blog mt-4 line-clamp-3 leading-7">
                  {meta.excerpt}
                </div>
                <Link
                  href={`/blog/${slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-sky-500 hover:text-sky-600 dark:text-sky-400">
                  Read more
                </Link>
              </div>
            </div>
          </div>
          {index !== posts.length - 1 && (
            <div className="contents divide-x divide-gray-950/5 dark:divide-white/10">
              <div className="h-16 max-lg:hidden" />
              <div className="h-16 max-lg:hidden" />
              <div className="h-16" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
