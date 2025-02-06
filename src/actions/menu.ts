import React from "react"
import { client } from "~/lib/api/index"

export const getMenu = React.cache(async (id: string) => {
  const { data } = await client.GET("/menus/{id}", {
    params: {
      path: {
        id: id,
      } as never,
      query: {
        fields: "id",
        populate: "items.children",
      } as never,
    },
  })

  return data?.data
})
