import React from "react"
import { api } from "~/lib/api"

export const getMenu = React.cache(async (id: string) => {
  const { data } = await api.GET("/menus/{id}", {
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
