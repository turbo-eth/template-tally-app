import Image, { ImageProps } from 'next/image'

interface ImageWithFallback extends ImageProps {
  fallbackSrc: string
}
export const ImageWithFallback = ({ fallbackSrc, ...props }: ImageWithFallback) => {
  return (
    <Image
      {...props}
      onError={(e) => {
        e.currentTarget.src = fallbackSrc
      }}
    />
  )
}
