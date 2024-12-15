import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { Mdx } from "~/components/mdx-components"
import { DashboardTableOfContents } from "~/components/toc"
import { getContents } from "~/lib/content"
import { mdxSerialize } from "~/lib/mdx-serialize"
import { getTableOfContents } from "~/lib/toc"
import { absoluteUrl } from "~/utils/url"

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export function generateStaticParams() {
  const docs = getContents("docs")
  return docs.map(doc => ({ params: { slug: doc.slug.toLowerCase() } }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = getContents("docs").find(
    project => project.slug.toLowerCase() === slug[0]?.toLowerCase(),
  )

  if (!doc) {
    return {}
  }

  const { title, summary: description, image } = doc.metadata
  const ogImage = image
    ? absoluteUrl(image)
    : absoluteUrl(`/api/og?title=${title}`)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${slug[0]}`),
      siteName: "Next.js with next-mdx-remote Blog",
      images: [
        {
          url: ogImage,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  const doc = getContents("docs").find(
    project => project.slug.toLowerCase() === slug[0]?.toLowerCase(),
  )

  if (!slug.length || !doc) {
    notFound()
  }

  const [mdxSource, toc] = await Promise.all([
    mdxSerialize(doc.content),
    getTableOfContents(doc.content),
  ])

  return (
    <div
      className={
        "container relative mx-auto py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      }>
      <div className={"mx-auto w-full min-w-0 max-w-3xl"}>
        <Mdx mdxSource={mdxSource} />
      </div>

      <div className={"hidden text-sm xl:block"}>
        <div className={"sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4"}>
          <div className={"no-scrollbar h-full overflow-auto pb-10"}>
            <DashboardTableOfContents toc={toc} />
          </div>
        </div>
      </div>
    </div>
  )
}
