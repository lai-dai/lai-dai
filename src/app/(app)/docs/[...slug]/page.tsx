import { allDocs } from "contentlayer/generated"
import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { Mdx } from "~/components/mdx-components"
import { DashboardTableOfContents } from "~/components/toc"
import { siteConfig } from "~/config/site"
import { getTableOfContents } from "~/lib/toc"
import { absoluteUrl } from "~/utils/url"

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params
  const pathname = slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === pathname)

  if (!doc) {
    return null
  }

  return doc
}

export function generateStaticParams() {
  return allDocs.map(doc => ({ params: { slug: doc.slug.toLowerCase() } }))
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const { title, description, slug } = doc

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${slug}`),
      siteName: "Next.js with next-mdx-remote Blog",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function PostPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <div
      className={
        "container relative mx-auto py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      }>
      <div className={"mx-auto w-full min-w-0 max-w-3xl"}>
      <Mdx code={doc.body.code} />
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
