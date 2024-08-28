import { siteConfig } from '@/config/site'

import { Card, CardContent } from './ui/card'

export function SiteFooter() {
  return (
    <footer id="site-footer" className="py-6 md:px-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
        <Card className="w-full">
          <CardContent className="p-3">
            <p className="text-center text-sm leading-loose text-muted-foreground">
              Made by{' '}
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                laidai
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </footer>
  )
}
