import { z } from 'zod'

// Phone validation regex for Turkish numbers
const phoneRegex = /^(05\d{9}|5\d{9}|\+905\d{9})$/

// ===========================================
// LEAD FORM VALIDATION
// ===========================================

export const leadFormStepASchema = z.object({
    city: z.string().min(1, 'İl seçimi zorunludur'),
    district: z.string().min(1, 'İlçe giriniz'),
    property_type: z.enum(['mustakil', 'site', 'isyeri'], {
        message: 'Mülk tipi seçimi zorunludur',
    }),
    // Address fields from Google Places (optional but recommended)
    address_text: z.string().optional(),
    place_id: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
})

export const leadFormStepBSchema = z.object({
    bill_range: z.string().min(1, 'Fatura aralığı seçimi zorunludur'),
})

export const leadFormStepCSchema = z.object({
    roof_type: z.enum(['duz', 'egimli', 'bilmiyorum'], {
        message: 'Çatı tipi seçimi zorunludur',
    }),
    shading: z.boolean(),
})

export const leadFormStepDSchema = z.object({
    timeline: z.enum(['hemen', '1-3-ay', '3-6-ay'], {
        message: 'Kurulum zamanı seçimi zorunludur',
    }),
    budget_range: z.string().optional(),
})

export const leadFormStepESchema = z.object({
    full_name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
    phone: z.string().regex(phoneRegex, 'Geçerli bir telefon numarası giriniz (05XX XXX XX XX)'),
    consent_kvkk: z.boolean().refine((val) => val === true, {
        message: 'KVKK aydınlatma metnini onaylamalısınız',
    }),
    consent_contact: z.boolean().refine((val) => val === true, {
        message: 'İletişim iznini onaylamalısınız',
    }),
})

// Complete lead form schema combining all steps
export const leadFormSchema = z.object({
    ...leadFormStepASchema.shape,
    ...leadFormStepBSchema.shape,
    ...leadFormStepCSchema.shape,
    ...leadFormStepDSchema.shape,
    ...leadFormStepESchema.shape,
})

export type LeadFormData = z.infer<typeof leadFormSchema>

// ===========================================
// INSTALLER FORM VALIDATION
// ===========================================

export const installerFormSchema = z.object({
    company_name: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır'),
    vkn: z.string()
        .length(10, 'VKN 10 haneli olmalıdır')
        .regex(/^\d+$/, 'VKN sadece rakamlardan oluşmalıdır'),
    regions: z.array(z.string()).min(1, 'En az bir bölge seçmelisiniz'),
    capacity_per_month: z.number().min(1, 'Kapasite en az 1 olmalıdır'),
    has_inhouse_install_team: z.boolean(),
    website: z.string().url('Geçerli bir URL giriniz').optional().or(z.literal('')),
    instagram: z.string().optional(),
    contact_name: z.string().min(2, 'Yetkili adı en az 2 karakter olmalıdır'),
    phone: z.string().regex(phoneRegex, 'Geçerli bir telefon numarası giriniz'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
})

export type InstallerFormData = z.infer<typeof installerFormSchema>

// ===========================================
// ADMIN ACTIONS VALIDATION
// ===========================================

export const updateLeadStatusSchema = z.object({
    leadId: z.string().uuid('Geçersiz lead ID'),
    status: z.enum(['new', 'contacted', 'qualified', 'closed', 'spam']),
    notes: z.string().optional(),
})

export const assignInstallerSchema = z.object({
    leadId: z.string().uuid('Geçersiz lead ID'),
    installerId: z.string().uuid('Geçersiz installer ID').nullable(),
})

export const updateInstallerStatusSchema = z.object({
    installerId: z.string().uuid('Geçersiz installer ID'),
    status: z.enum(['pending', 'approved', 'rejected']),
    notes: z.string().optional(),
})

// ===========================================
// AUTH VALIDATION
// ===========================================

export const magicLinkSchema = z.object({
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
})

export type MagicLinkFormData = z.infer<typeof magicLinkSchema>
