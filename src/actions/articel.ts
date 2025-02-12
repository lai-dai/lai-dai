import React from "react"
import { api } from "~/lib/api"

export const createArticle = React.cache(async () => {
  const { data } = await api.POST("/articles", {
    body: {
      data: {},
    },
  })

  return data?.data
})
