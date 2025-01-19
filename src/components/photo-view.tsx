"use client"

import "react-photo-view/dist/react-photo-view.css"

import * as ReactPhotoView from "react-photo-view"
import { type PhotoProviderProps } from "react-photo-view/dist/PhotoProvider"
import { type PhotoViewProps } from "react-photo-view/dist/PhotoView"

import { cn } from "~/lib/utils"

function PhotoProvider({ className, ...props }: PhotoProviderProps) {
  return (
    <ReactPhotoView.PhotoProvider
      loadingElement={
        <div className={"size-24 animate-spin rounded-full border-y-2 border-gray-900"} />
      }
      className={cn("pointer-events-auto", className)}
      maskOpacity={0.9}
      {...props}
    />
  )
}

function PhotoView(props: PhotoViewProps) {
  const src = props.children ? props.children?.props?.src : undefined

  return <ReactPhotoView.PhotoView
    src={src}
    {...props}
  />
}

export { PhotoProvider, PhotoView }
