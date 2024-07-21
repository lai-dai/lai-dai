'use client'

import 'lazysizes'

import { forwardRef } from 'react'
import NextImage, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

export const Image = forwardRef<
  HTMLImageElement,
  Omit<ImageProps, 'height' | 'width'>
>(function Image({ src, className, ...props }, ref) {
  return (
    <NextImage
      ref={ref}
      suppressHydrationWarning
      width={0}
      height={0}
      quality={80}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      data-src={src || '/images/default-image.jpg'}
      className={cn('lazyload h-auto w-full', className)}
      {...props}
    />
  )
})
