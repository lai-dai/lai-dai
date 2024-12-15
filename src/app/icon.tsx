import { ImageResponse } from "next/og"
import { Icons } from "~/components/icon"

export const runtime = "edge"

export const size = {
  width: 28,
  height: 28,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}>
        <Icons.logo style={{...size}} />
      </div>
    ),
    {
      ...size,
    },
  )
}
