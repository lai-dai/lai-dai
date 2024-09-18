'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { TriangleAlert } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getErrorMessage } from '@/lib/utils/error-message'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'

import { loginAdminSchema } from './schema'
import { LoginAdminAttr } from './type'

export function LoginAdminForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<LoginAdminAttr>({
    resolver: zodResolver(loginAdminSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit(
    async (data) => {
      try {
        const res = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (!res?.ok) throw new Error(res?.error || 'Lỗi')

        router.replace(searchParams.get('callbackUrl') || '/admin')
        router.refresh()

        toast.success('Đăng nhập thành công')
      } catch (error) {
        console.error(error)
        const message = getErrorMessage(error, 'Đăng nhập thất bại')
        form.setError('root', { message })
        toast.error(message)
      }
    },
    (error) => {
      console.error(error)
      if (error && Object.keys(error).length > 0) {
        Object.entries(error).forEach(([name, error]) => {
          form.setError(name as any, error as any)
        })
      }
    }
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="myEmail@gmail.com"
                  type="email"
                  inputMode="email"
                  autoComplete="given-email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  {...field}
                  inputMode="text"
                  autoComplete="given-password"
                  placeholder="Mật khẩu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <Alert variant="destructive">
            <TriangleAlert className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <Button size={'lg'} type="submit">
          {form.formState.isSubmitting && <Spinner className="mr-3" />}
          Login
        </Button>
      </form>
    </Form>
  )
}
