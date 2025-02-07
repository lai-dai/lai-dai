import { notFound } from "next/navigation"
import React from "react"
import { HtmlParser } from "~/components/html-parser"
import { client } from "~/lib/api/index"

export async function generateStaticParams() {
  const response = await client.GET("/grammar-lessons/all-slugs")

  if (response.error) {
    return []
  }
  return response.data.data?.map(it => ({ slug: it.slug })) ?? []
}

interface SingleLessonPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SingleLessonPage({
  params,
}: SingleLessonPageProps) {
  try {
    const { slug } = await params
    const response = await client.GET("/grammar-lessons/{id}", {
      params: {
        path: {
          id: slug,
        } as never,
      },
    })

    if (!response.data) {
      return "Lỗi"
    }

    return (
      <div className={"container relative mx-auto py-6 lg:py-8"}>
        <h1>{response.data.data?.title}</h1>

        <HtmlParser html={response.data.data?.content} />
      </div>
    )
  } catch {
    notFound()
  }
}
