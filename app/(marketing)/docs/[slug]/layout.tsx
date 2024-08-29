import '@/styles/mdx.css'

import { ReactNode } from 'react'

import { Photos } from '@/components/ui/photo'
import { MarketingPageContainer } from '@/components/page-container'

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <MarketingPageContainer>
      <article className="prose prose-sm prose-slate !prose-invert mx-auto md:prose-base lg:prose-lg">
        <Photos>{children}</Photos>
      </article>
    </MarketingPageContainer>
  )
}
