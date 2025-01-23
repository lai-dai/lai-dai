import React from "react"
import { client } from "~/lib/api/index"

export const getConfigs = React.cache(
  async () => {
    const {data} = await client.GET("/config", {
      params: {
        query: {
          populate: {
            config_menu: {
              fields: "id",
            },
            config_default_image: {
              fields: "url",
            },
          },
          fields: ["config_default_image_height", "config_default_image_width"],
        },
      },
    })

    return  data?.data
  }
)
