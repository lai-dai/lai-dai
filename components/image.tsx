'use client'

import 'lazysizes'

import { forwardRef } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

import { cn } from '@/lib/utils'

export interface ImageProps extends Omit<NextImageProps, 'height' | 'width'> {
  height?: number | `${number}`
  width?: number | `${number}`
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, className, ...props },
  ref
) {
  return (
    <NextImage
      ref={ref}
      suppressHydrationWarning
      width={0}
      height={0}
      quality={80}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      data-src={src || '/images/default-image.jpg'}
      className={cn('lazyload h-auto w-full', className)}
      {...props}
    />
  )
})
