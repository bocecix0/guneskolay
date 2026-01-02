'use server'

import { createClient } from '@/lib/supabase/server'
import { magicLinkSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'

export type AuthResult = {
    success: boolean
    error?: string
}

/**
 * Send magic link for admin login
 */
export async function sendMagicLink(formData: unknown): Promise<AuthResult> {
    try {
        const validatedData = magicLinkSchema.safeParse(formData)

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.issues[0]?.message || 'Geçersiz e-posta',
            }
        }

        const { email } = validatedData.data

        const supabase = await createClient()

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/auth/callback`,
            },
        })

        if (error) {
            console.error('Error sending magic link:', error)
            return {
                success: false,
                error: 'Giriş linki gönderilemedi. Lütfen tekrar deneyin.',
            }
        }

        return { success: true }
    } catch (error) {
        console.error('Error in sendMagicLink:', error)
        return {
            success: false,
            error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        }
    }
}

/**
 * Sign out admin user
 */
export async function signOut(): Promise<void> {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
}
