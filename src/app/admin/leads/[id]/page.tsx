import { Metadata } from 'next'
import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Sun, Phone, MapPin, Home, Zap, Calendar } from 'lucide-react'
import { LEAD_STATUSES, PROPERTY_TYPES, ROOF_TYPES, TIMELINES, BILL_RANGES } from '@/lib/constants'
import { getScoreLabel } from '@/lib/scoring'
import { LeadStatusForm } from './lead-status-form'

export const metadata: Metadata = {
    title: 'Lead Detay | Admin',
    robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLeadDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    const { id } = await params

    const { data: lead, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !lead) {
        notFound()
    }

    // Get installers for assignment
    const { data: installers } = await supabase
        .from('installers')
        .select('id, company_name')
        .eq('status', 'approved')
        .order('company_name')

    const status = LEAD_STATUSES.find((s) => s.value === lead.status)
    const propertyType = PROPERTY_TYPES.find((p) => p.value === lead.property_type)
    const roofType = ROOF_TYPES.find((r) => r.value === lead.roof_type)
    const timeline = TIMELINES.find((t) => t.value === lead.timeline)
    const billRange = BILL_RANGES.find((b) => b.value === lead.bill_range)
    const scoreLabel = getScoreLabel(lead.score)

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <header className="bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/leads">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                            <Sun className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-lg font-semibold">Lead Detay</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{lead.full_name}</CardTitle>
                                        <p className="text-muted-foreground">
                                            {new Date(lead.created_at).toLocaleString('tr-TR')}
                                        </p>
                                    </div>
                                    <Badge className={status?.color || ''}>
                                        {status?.label || lead.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                                        {lead.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <span>{lead.city}, {lead.district}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Detaylar</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Mülk Tipi</p>
                                            <p className="font-medium">{propertyType?.label || lead.property_type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Zap className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Aylık Fatura</p>
                                            <p className="font-medium">{billRange?.label || lead.bill_range}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Çatı Tipi</p>
                                            <p className="font-medium">{roofType?.label || lead.roof_type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Zaman Çizelgesi</p>
                                            <p className="font-medium">{timeline?.label || lead.timeline}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Gölgeleme</p>
                                        <p className="font-medium">{lead.shading ? 'Var' : 'Yok'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Bütçe Aralığı</p>
                                        <p className="font-medium">{lead.budget_range || 'Belirtilmedi'}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">KVKK Onayı</p>
                                        <p className="font-medium">{lead.consent_kvkk ? '✓ Onaylandı' : '✗ Onaylanmadı'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">İletişim İzni</p>
                                        <p className="font-medium">{lead.consent_contact ? '✓ Onaylandı' : '✗ Onaylanmadı'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Score Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Lead Skoru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-primary">{lead.score}</div>
                                    <p className={`mt-2 font-medium ${scoreLabel.color}`}>
                                        {scoreLabel.label}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status Update */}
                        <LeadStatusForm
                            leadId={lead.id}
                            currentStatus={lead.status}
                            currentNotes={lead.notes}
                            assignedInstallerId={lead.assigned_installer_id}
                            installers={installers || []}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
