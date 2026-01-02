import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminLoginForm } from './login-form'

export const metadata: Metadata = {
    title: 'Admin Giriş',
    robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect('/admin')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <AdminLoginForm />
        </div>
    )
}
