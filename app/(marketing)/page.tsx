'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { siteConfig } from '@/config/site'
import { HoverEffectCard } from '@/components/ui/card-hover-effect.tsx'
import { Highlight } from '@/components/ui/hero-highlight'
import { MarketingPageContainer } from '@/components/page-container'

export default function Home(props: {
  params: {}
  searchParams: Record<string, any>
}) {
  const t = useTranslations()
  return (
    <MarketingPageContainer>
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
        className="text-2xl font-medium leading-relaxed text-neutral-700 dark:text-white sm:text-3xl md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-snug"
      >
        {t('Hello')}, {t('I am')} {siteConfig.author} 👋
        <br /> Dev{' '}
        <Highlight className="inline-block text-black dark:text-white">
          Front-end
        </Highlight>{' '}
        & {t('Content Creator')}
      </motion.h1>

      {/* <HoverEffectCard items={projects} /> */}
    </MarketingPageContainer>
  )
}

const projects = [
  {
    title: 'Stripe',
    description:
      'A technology company that builds economic infrastructure for the internet.',
    link: 'https://stripe.com',
  },
  {
    title: 'Netflix',
    description:
      'A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
    link: 'https://netflix.com',
  },
  {
    title: 'Google',
    description:
      'A multinational technology company that specializes in Internet-related services and products.',
    link: 'https://google.com',
  },
  {
    title: 'Meta',
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: 'https://meta.com',
  },
  {
    title: 'Amazon',
    description:
      'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    link: 'https://amazon.com',
  },
  {
    title: 'Microsoft',
    description:
      'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    link: 'https://microsoft.com',
  },
]
