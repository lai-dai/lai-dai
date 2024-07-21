'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function NotFound() {
  const router = useRouter()

  return (
    <section className="container grid min-h-svh place-content-center text-center">
      <h1 className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </h1>

      <h2 className="my-2 text-2xl font-bold">Oops...</h2>

      <p className="text-muted-foreground">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được thay đổi.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Quay lại
        </Button>
        <Button onClick={() => router.push('/')} variant="secondary" size="lg">
          Trang chủ
        </Button>
      </div>
    </section>
  )
}
