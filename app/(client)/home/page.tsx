import Link from 'next/link'

import { PageContainer } from '@/components/container'

import { Client } from './_components/client'
import { HeroLanding } from './_components/hero-landing'

export default function Home(props: {
  params: {}
  searchParams: Record<string, any>
}) {
  return (
    <>
      <HeroLanding />
      <PageContainer className="space-y-6"></PageContainer>
    </>
  )
}
