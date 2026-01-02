export type Lead = {
    id: string
    created_at: string
    city: string
    district: string
    property_type: 'mustakil' | 'site' | 'isyeri'
    bill_range: string
    roof_type: 'duz' | 'egimli' | 'bilmiyorum'
    shading: boolean
    timeline: 'hemen' | '1-3-ay' | '3-6-ay'
    budget_range: string | null
    full_name: string
    phone: string
    consent_kvkk: boolean
    consent_contact: boolean
    score: number
    status: 'new' | 'contacted' | 'qualified' | 'closed' | 'spam'
    assigned_installer_id: string | null
    notes: string | null
}

export type Installer = {
    id: string
    created_at: string
    company_name: string
    vkn: string
    regions: string[]
    capacity_per_month: number
    has_inhouse_install_team: boolean
    website: string | null
    instagram: string | null
    contact_name: string
    phone: string
    email: string
    status: 'pending' | 'approved' | 'rejected'
    notes: string | null
}

export type Database = {
    public: {
        Tables: {
            leads: {
                Row: Lead
                Insert: Omit<Lead, 'id' | 'created_at' | 'score' | 'status' | 'assigned_installer_id' | 'notes'>
                Update: Partial<Lead>
            }
            installers: {
                Row: Installer
                Insert: Omit<Installer, 'id' | 'created_at' | 'status' | 'notes'>
                Update: Partial<Installer>
            }
        }
    }
}
