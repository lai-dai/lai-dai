import { notFound } from "next/navigation"
import { HtmlParser } from "~/components/html-parser"
import { api } from "~/lib/api"

// bắt buộc các trang slug phải là tĩnh
export const dynamic = "force-static"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const { data, error } = await api.GET("/articles/all-slugs")

  if (error) {
    return []
  }

  return data.data?.map(it => ({ slug: it.slug })) ?? []
}

export default async function ArticlePage(props: Props) {
  const params = await props.params
  const { data, error } = await api.GET("/articles/{id}", {
    params: {
      path: {
        id: params.slug,
      },
    },
  })

  if (error) {
    return notFound()
  }

  return (
    <div className="space-y-3">
      <h1>{data.data?.title}</h1>
      <p>{data.data?.desc}</p>

      <div className="border p-2">
        <HtmlParser html={data.data?.content} />
      </div>
    </div>
  )
}
