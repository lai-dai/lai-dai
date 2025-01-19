import Link from "next/link"
import React from "react"
import { Button } from "~/components/ui/button"
import { client } from "~/lib/api/index"

export default async function GrammarPage() {
  const response = await client.GET("/grammar-levels", {
    params: {
      query: {
        fields: "title,slug,description",
        sort: "order:asc",
      },
    },
  })

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {response.data?.data?.map(it => (
          <div key={it.id} className="rounded-md border p-3">
            <h5 className="font-semibold">{it.title}</h5>

            <p className="text-xs text-muted-foreground">{it.description}</p>

            <div className="text-end">
              <Button asChild>
                <Link href={`/lessons?level_slug=${it.slug}`}>Bài học</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
