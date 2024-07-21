'use client'

import 'react-photo-view/dist/react-photo-view.css'

import { PhotoProvider, PhotoView } from 'react-photo-view'
import { PhotoProviderProps } from 'react-photo-view/dist/PhotoProvider'
import { PhotoViewProps } from 'react-photo-view/dist/PhotoView'

import { delve } from '@/lib/utils/delve'

import { Spinner } from './spinner'

export function Photos(props: PhotoProviderProps) {
  return (
    <PhotoProvider
      className="pointer-events-auto"
      loadingElement={<Spinner className="size-12" />}
      maskOpacity={0.9}
      {...props}
    />
  )
}

export function PhotoItem(props: PhotoViewProps) {
  const src = props.children
    ? delve(
        props.children?.props,
        'data-src',
        delve(props.children?.props, 'src')
      )
    : undefined

  return <PhotoView src={src} {...props} />
}
