import React from "react"
import { client } from "~/lib/api/index"

export const createArticle = React.cache(async () => {
  const { data } = await client.POST("/articles", {
    body: {
      data: {}
    }
  })

  return data?.data
})
