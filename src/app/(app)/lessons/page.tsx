import Link from "next/link"
import React from "react"
import { Button } from "~/components/ui/button"
import { client } from "~/lib/api/index"

interface LessonsPageProps {
  searchParams: Promise<{
    level_slug: string
  }>
}

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const { level_slug } = await searchParams
  const response = await client.GET("/grammar-lessons", {
    params: {
      query: {
        fields: "title,slug,description",
        sort: "order:asc",
        filters: level_slug
          ? {
              level: {
                slug: {
                  $eq: level_slug,
                },
              },
            }
          : undefined,
      },
    },
  })

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-3">
        {response.data?.data?.map(it => (
          <div key={it.id} className="rounded-md border p-3">
            <h5 className="font-semibold">{it.title}</h5>

            <p className="text-xs text-muted-foreground">{it.description}</p>

            <div className="text-end">
              <Button asChild>
                <Link href={`/lessons/${it.slug}`}>Xem bài học</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
