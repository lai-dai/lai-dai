import { ComponentPropsWithoutRef } from 'react'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'
import { remarkSourceRedirect } from '@/lib/utils/remark-source-redirect'
import { PhotoItem } from '@/components/ui/photo'

import { Image } from './ui/image'
import { Link } from './mdx/link'

const options: ComponentPropsWithoutRef<typeof MDXRemote>['options'] = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
      [
        remarkSourceRedirect,
        {
          slug: 'blogs/tailwindcss/introducing-linting-for-tailwindcss-intellisense',
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'vitesse-dark',
          // keepBackground: false,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className = ['line--highlighted']
          },
          onVisitHighlightedChars(node) {
            node.properties.className = ['chars--highlighted']
          },
        } as Options,
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: [
              // FIXME: seems like its not displayed
              "no-underline after:content-['#'] ml-1 after:text-gray-200 hover:after:text-gray-500 hover:after:bg-gray-50 after:rounded-md after:p-1",
            ],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
}

const components: ComponentPropsWithoutRef<typeof MDXRemote>['components'] = {
  img: (props) => {
    return (
      <PhotoItem>
        <Image alt={props?.alt || ''} src={props?.src || ''} {...props} />
      </PhotoItem>
    )
  },
  a: Link,
  pre: (props) => {
    return <pre {...props} className={cn('border', props.className)} />
  },
}

export function MdxContent(props: MDXRemoteProps) {
  return <MDXRemote {...props} options={options} components={components} />
}
