import '@/styles/mdx.css'

import { ReactNode } from 'react'

import { PageContainer } from '@/components/container'
import { Photos } from '@/components/photo'

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <article className="prose prose-sm prose-slate !prose-invert mx-auto md:prose-base lg:prose-lg">
        <Photos>{children}</Photos>
      </article>
    </PageContainer>
  )
}
