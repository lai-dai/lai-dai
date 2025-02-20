import Link from "next/link"
import React from "react"
import { api } from "~/lib/api"

export default async function ArticlesPage() {
  const { data, error } = await api.GET("/articles")

  if (error) {
    return <div>{error.error.message}</div>
  }

  return (
    <div className="space-y-3">
      {data.data?.map(it => (
        <div
          key={it.id}
          className="border p-2">
          <Link href={`/articles/${it.slug}`}>{it.title}</Link>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  )
}
