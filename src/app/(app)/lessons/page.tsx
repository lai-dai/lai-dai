import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import { Button } from "~/components/ui/button"
import { client } from "~/lib/api/index"

interface LessonsPageProps {
  searchParams: Promise<{
    level_slug: string
  }>
}

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  try {
    const { level_slug } = await searchParams

    const response = await client.GET("/grammar-lessons", {
      params: {
        query: {
          fields: "title,slug,desc",
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

    if (response.error) {
      return (
        <pre className={"whitespace-pre-wrap"}>
          {JSON.stringify(response.error)}
        </pre>
      )
    }

    return (
      <div className={"container mx-auto py-6"}>
        <div className={"space-y-3"}>
          {response.data?.data?.map(it => (
            <div
              className={"rounded-md border p-3"}
              key={it.id}
            >
              <h5 className={"font-semibold"}>{it.title}</h5>

              <p className={"text-xs text-muted-foreground"}>{it.desc}</p>

              <div className={"text-end"}>
                <Button asChild={true}>
                  <Link href={`/lessons/${it.slug}`}>{"Xem bài học"}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
