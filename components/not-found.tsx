'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

export function NotFound({
  statusCode = 404,
  message = 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được thay đổi',
}: {
  statusCode?: number
  message?: string
}) {
  const router = useRouter()
  const t = useTranslations()
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background py-14 text-center">
      <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        {statusCode}
      </span>
      <h2 className="my-2 text-2xl font-bold">Oops...</h2>
      <p>{message}</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          {t('Back')}
        </Button>
        <Button onClick={() => router.push('/')} variant="secondary" size="lg">
          {t('Home')}
        </Button>
      </div>
    </div>
  )
}
