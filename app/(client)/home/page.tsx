import { BackgroundBeams } from '@/components/ui/background-beams'
import { PageContainer } from '@/components/container'

import { ComboboxDemo } from './_components/combobox'
import { HeroLanding } from './_components/hero-landing'
import { CardHoverEffectDemo } from './_components/demo'

export default function Home(props: {
  params: {}
  searchParams: Record<string, any>
}) {
return (
  <CardHoverEffectDemo />
)
  return (
    <>
      <HeroLanding />
      <PageContainer className="space-y-6">
        <ComboboxDemo />
      </PageContainer>
    </>
  )
}
