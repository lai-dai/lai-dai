import { Image, ImageProps } from './ui/image'

export function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  return <Image {...props} src={'/logo.png'} alt="logo" />
}
