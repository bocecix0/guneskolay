'use server'

import { createClient } from '@/lib/supabase/server'
import { installerFormSchema, updateInstallerStatusSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
    success: boolean
    error?: string
    data?: Record<string, unknown>
}

/**
 * Submit a new installer application
 */
export async function submitInstallerApplication(formData: unknown): Promise<ActionResult> {
    try {
        // Validate input
        const validatedData = installerFormSchema.safeParse(formData)

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.issues[0]?.message || 'Geçersiz form verisi',
            }
        }

        const data = validatedData.data

        // Create Supabase client
        const supabase = await createClient()

        // Insert installer
        const { data: installer, error } = await supabase
            .from('installers')
            .insert({
                company_name: data.company_name,
                vkn: data.vkn,
                regions: data.regions,
                capacity_per_month: data.capacity_per_month,
                has_inhouse_install_team: data.has_inhouse_install_team,
                website: data.website || null,
                instagram: data.instagram || null,
                contact_name: data.contact_name,
                phone: data.phone,
                email: data.email,
                status: 'pending',
            })
            .select('id')
            .single()

        if (error) {
            console.error('Error inserting installer:', error)
            return {
                success: false,
                error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
            }
        }

        return {
            success: true,
            data: { installerId: installer.id },
        }
    } catch (error) {
        console.error('Error in submitInstallerApplication:', error)
        return {
            success: false,
            error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        }
    }
}

/**
 * Update installer status (admin only)
 */
export async function updateInstallerStatus(formData: unknown): Promise<ActionResult> {
    try {
        const validatedData = updateInstallerStatusSchema.safeParse(formData)

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { installerId, status, notes } = validatedData.data

        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return { success: false, error: 'Yetkisiz işlem' }
        }

        const updateData: { status: string; notes?: string } = { status }
        if (notes !== undefined) {
            updateData.notes = notes
        }

        const { error } = await supabase
            .from('installers')
            .update(updateData)
            .eq('id', installerId)

        if (error) {
            console.error('Error updating installer:', error)
            return { success: false, error: 'Güncelleme başarısız' }
        }

        revalidatePath('/admin/installers')
        revalidatePath('/firmalar')

        return { success: true }
    } catch (error) {
        console.error('Error in updateInstallerStatus:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}

/**
 * Get approved installers (public)
 */
export async function getApprovedInstallers() {
    try {
        const supabase = await createClient()

        const { data: installers, error } = await supabase
            .from('installers')
            .select('id, company_name, regions, capacity_per_month, has_inhouse_install_team')
            .eq('status', 'approved')
            .order('company_name')

        if (error) {
            console.error('Error fetching installers:', error)
            return []
        }

        return installers
    } catch (error) {
        console.error('Error in getApprovedInstallers:', error)
        return []
    }
}
