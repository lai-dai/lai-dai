import React from "react"
import { client } from "~/lib/api/index"

export const getMenu = React.cache(async (id: string) => {
  const { data } = await client.GET("/menus/{id}", {
    params: {
      path: {
        id,
      },
      query: {
        fields: "id",
        populate: "items.children",
      },
    },
  })

  return data?.data
})
