'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateLeadScore } from '@/lib/scoring'
import { leadFormSchema, updateLeadStatusSchema, assignInstallerSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
    success: boolean
    error?: string
    data?: Record<string, unknown>
}

/**
 * Submit a new lead from the quote form
 */
export async function submitLead(formData: unknown): Promise<ActionResult> {
    try {
        // Validate input
        const validatedData = leadFormSchema.safeParse(formData)

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.issues[0]?.message || 'Geçersiz form verisi',
            }
        }

        const data = validatedData.data

        // Calculate lead score
        const { score } = calculateLeadScore({
            timeline: data.timeline,
            bill_range: data.bill_range,
            property_type: data.property_type,
            roof_type: data.roof_type,
            shading: data.shading,
            city: data.city,
            district: data.district,
        })

        // Create Supabase client
        const supabase = await createClient()

        // Insert lead
        const { data: lead, error } = await supabase
            .from('leads')
            .insert({
                city: data.city,
                district: data.district,
                property_type: data.property_type,
                bill_range: data.bill_range,
                roof_type: data.roof_type,
                shading: data.shading,
                timeline: data.timeline,
                budget_range: data.budget_range || null,
                full_name: data.full_name,
                phone: data.phone,
                consent_kvkk: data.consent_kvkk,
                consent_contact: data.consent_contact,
                score,
                status: 'new',
                // Address fields from Google Places
                address_text: data.address_text || null,
                place_id: data.place_id || null,
                lat: data.lat || null,
                lng: data.lng || null,
            })
            .select('id')
            .single()

        if (error) {
            console.error('Error inserting lead:', error)
            return {
                success: false,
                error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
            }
        }

        return {
            success: true,
            data: { leadId: lead.id, score },
        }
    } catch (error) {
        console.error('Error in submitLead:', error)
        return {
            success: false,
            error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        }
    }
}

/**
 * Update lead status (admin only)
 */
export async function updateLeadStatus(formData: unknown): Promise<ActionResult> {
    try {
        const validatedData = updateLeadStatusSchema.safeParse(formData)

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { leadId, status, notes } = validatedData.data

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
            .from('leads')
            .update(updateData)
            .eq('id', leadId)

        if (error) {
            console.error('Error updating lead:', error)
            return { success: false, error: 'Güncelleme başarısız' }
        }

        revalidatePath('/admin/leads')
        revalidatePath(`/admin/leads/${leadId}`)

        return { success: true }
    } catch (error) {
        console.error('Error in updateLeadStatus:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}

/**
 * Assign installer to lead (admin only)
 */
export async function assignInstaller(formData: unknown): Promise<ActionResult> {
    try {
        const validatedData = assignInstallerSchema.safeParse(formData)

        if (!validatedData.success) {
            return {
                success: false,
                error: validatedData.error.issues[0]?.message || 'Geçersiz veri',
            }
        }

        const { leadId, installerId } = validatedData.data

        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return { success: false, error: 'Yetkisiz işlem' }
        }

        const { error } = await supabase
            .from('leads')
            .update({ assigned_installer_id: installerId })
            .eq('id', leadId)

        if (error) {
            console.error('Error assigning installer:', error)
            return { success: false, error: 'Atama başarısız' }
        }

        revalidatePath('/admin/leads')
        revalidatePath(`/admin/leads/${leadId}`)

        return { success: true }
    } catch (error) {
        console.error('Error in assignInstaller:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}
