import React from "react"
import { client } from "~/lib/api/index"
import { HtmlParser } from "~/components/html-parser"

interface SingleLessonPageProps {
  params: Promise<{
    documentId: string
  }>
}

export default async function SingleLessonPage({
  params,
}: SingleLessonPageProps) {
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
}
