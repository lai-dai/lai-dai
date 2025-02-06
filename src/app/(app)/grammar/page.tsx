import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import { Button } from "~/components/ui/button"
import { client } from "~/lib/api/index"

export default async function GrammarPage() {
  try {
    const response = await client.GET("/grammar-levels", {
      params: {
        query: {
          fields: ["title", "slug", "desc"] as never,
          sort: "order:asc",
        },
      },
    })

    if (!response.data) {
      return "Lỗi"
    }

    return (
      <div className={"container mx-auto py-6"}>
        <div className={"space-y-6"}>
          {response.data?.data?.map(it => (
            <div
              className={"rounded-md border p-3"}
              key={it.id}
            >
              <h5 className={"font-semibold"}>{it.title}</h5>

              <p className={"text-xs text-muted-foreground"}>{it.desc}</p>

              <div className={"text-end"}>
                <Button asChild={true}>
                  <Link href={`/lessons?level_slug=${it.slug}`}>
                    {"Bài học"}
                  </Link>
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
