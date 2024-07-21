'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { siteConfig } from '@/config/site'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { PageContainer } from '@/components/container'

export function HeroLanding() {
  const t = useTranslations()

  return (
    <HeroHighlight classNames={{ container: 'h-screen' }}>
      <PageContainer className="py-14">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-3xl lg:leading-snug"
        >
          {t('Hello')}, {t('I am')} {siteConfig.author} 👋
          <br /> Dev{' '}
          <Highlight className="inline-block text-black dark:text-white">
            Front-end
          </Highlight>{' '}
          & {t('Content Creator')}
        </motion.h1>
      </PageContainer>
    </HeroHighlight>
  )
}
