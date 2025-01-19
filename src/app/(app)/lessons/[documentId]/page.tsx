import { notFound } from "next/navigation"
import React from "react"
import { HtmlParser } from "~/components/html-parser"
import { client } from "~/lib/api/index"

interface SingleLessonPageProps {
  params: Promise<{
    documentId: string
  }>
}

export default async function SingleLessonPage({
  params,
}: SingleLessonPageProps) {
  try {
    const { documentId } = await params
    const response = await client.GET("/grammar-lessons/{id}", {
      params: {
        path: {
          id: documentId,
        },
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
