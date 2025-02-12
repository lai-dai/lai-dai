import React from "react"
import { api } from "~/lib/api"

export const getConfigs = React.cache(async () => {
  const { data } = await api.GET("/config", {
    params: {
      query: {
        populate: {
          config_menu: {
            fields: "id",
          },
          config_default_image: {
            fields: "url",
          },
        } as never,
        fields: [
          "config_default_image_height",
          "config_default_image_width",
        ] as never,
      },
    },
  })

  return data?.data
})
