'use client'

import 'react-photo-view/dist/react-photo-view.css'

import * as ReactPhotoView from 'react-photo-view'
import { type PhotoProviderProps } from 'react-photo-view/dist/PhotoProvider'
import { type PhotoViewProps } from 'react-photo-view/dist/PhotoView'

import { Loader } from '~/components/loader'
import { delve } from '~/utils/delve'


export function PhotoView(props: PhotoProviderProps) {
  return (
    <ReactPhotoView.PhotoProvider
      className={"pointer-events-auto"}
      loadingElement={<Loader className={"size-12"} />}
      maskOpacity={0.9}
      {...props}/>
  )
}

export function Photo(props: PhotoViewProps) {
  const src = props.children
    ? delve(props.children?.props, 'src')
    : undefined

  return <ReactPhotoView.PhotoView
    src={src}
    {...props} />
}
