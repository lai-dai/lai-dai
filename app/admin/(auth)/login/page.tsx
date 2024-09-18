import { redirect } from 'next/navigation'

import { authAdmin } from '@/lib/auth-admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { LoginAdminForm } from './form'

export const metadata = {
  title: 'Login',
}

export default async function Page() {
  const session = await authAdmin()

  if (session) redirect('/admin')

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-auto">
      <div className="grid flex-1 place-content-center">
        <Card className="w-screen max-w-sm">
          <CardHeader>
            <CardTitle>Đăng nhập - Admin</CardTitle>
          </CardHeader>

          <CardContent>
            <LoginAdminForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
