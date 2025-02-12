"use client"; // required

import "react-photo-view/dist/react-photo-view.css";

import * as ReactPhotoView from "react-photo-view";
import { type PhotoProviderProps } from "react-photo-view/dist/PhotoProvider";
import { type PhotoViewProps } from "react-photo-view/dist/PhotoView";

import { cn } from "~/lib/utils";
import { delve } from "~/utils/delve";

function PhotoProvider({ className, ...props }: PhotoProviderProps) {
  return (
    <ReactPhotoView.PhotoProvider
      loadingElement={
        <div
          className={
            "size-24 animate-spin rounded-full border-y-2 border-gray-900"
          }
        />
      }
      className={cn("pointer-events-auto", className)}
      maskOpacity={0.9}
      {...props}
    />
  );
}

function PhotoView(props: PhotoViewProps) {
  let src = props.children
    ? delve(props.children?.props as object, "src")
    : undefined;

  if (typeof src === "object") {
    src = delve(src, "src");
  }

  return <ReactPhotoView.PhotoView src={src} {...props} />;
}

export { PhotoProvider, PhotoView };
