"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "~/components/ui/button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      variant={"ghost"}
    >
      <ChevronLeft />

      {"Back"}
    </Button>
  )
}
