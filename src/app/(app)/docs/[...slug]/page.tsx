import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { Mdx } from "~/components/mdx-remote"
import { DashboardTableOfContents } from "~/components/toc"
import { siteConfig } from "~/config/site"
import { getContents } from "~/lib/content"
import { mdxSerialize } from "~/lib/mdx-serialize"
import { getTableOfContents } from "~/lib/toc"
import { absoluteUrl } from "~/utils/url"

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = getContents("docs").find(
    project => project.slug.toLowerCase() === slug[0]?.toLowerCase(),
  )

  if (!doc) {
    return {}
  }

  const { title, description } = doc.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${slug.join("/")}`),
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

export function generateStaticParams() {
  const docs = getContents("docs")
  return docs.map(doc => ({ slug: doc.slug.split("/") }))
}
// export async function generateStaticParams() {
//   return allDocs.map((doc) => ({
//     slug: doc.slugAsParams.split("/"),
//   }))
// }

export default async function PostPage({ params }: DocPageProps) {
  const { slug } = await params

  const doc = getContents("docs").find(
    project => project.slug === slug.join("/"),
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
      }
    >
      <div className={"mx-auto w-full min-w-0 max-w-3xl"}>
        <h1 className={"mb-4 break-words text-4xl font-semibold"}>
          {doc.metadata.title}
        </h1>

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
