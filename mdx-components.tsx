import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import { ImageCarousel, type ImageCarouselProps } from './src/components/ImageCarousel'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} alt={props.alt} />,
    ImageCarousel: (props: ImageCarouselProps) => <ImageCarousel {...props} />
  }
}
