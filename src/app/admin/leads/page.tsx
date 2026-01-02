import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ArrowLeft, Eye, Sun } from 'lucide-react'
import { LEAD_STATUSES } from '@/lib/constants'

export const metadata: Metadata = {
    title: 'Lead Yönetimi | Admin',
    robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    const params = await searchParams
    const statusFilter = params.status

    let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
    }

    const { data: leads, error } = await query.limit(100)

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <header className="bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                            <Sun className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-lg font-semibold">Lead Yönetimi</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button
                        variant={!statusFilter || statusFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        asChild
                    >
                        <Link href="/admin/leads">Tümü</Link>
                    </Button>
                    {LEAD_STATUSES.map((status) => (
                        <Button
                            key={status.value}
                            variant={statusFilter === status.value ? 'default' : 'outline'}
                            size="sm"
                            asChild
                        >
                            <Link href={`/admin/leads?status=${status.value}`}>{status.label}</Link>
                        </Button>
                    ))}
                </div>

                {/* Leads Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Leadler ({leads?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!leads || leads.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">
                                Henüz lead bulunmuyor.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tarih</TableHead>
                                            <TableHead>İsim</TableHead>
                                            <TableHead>Telefon</TableHead>
                                            <TableHead>Konum</TableHead>
                                            <TableHead>Skor</TableHead>
                                            <TableHead>Durum</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {leads.map((lead) => {
                                            const status = LEAD_STATUSES.find((s) => s.value === lead.status)
                                            return (
                                                <TableRow key={lead.id}>
                                                    <TableCell className="whitespace-nowrap">
                                                        {new Date(lead.created_at).toLocaleDateString('tr-TR')}
                                                    </TableCell>
                                                    <TableCell className="font-medium">{lead.full_name}</TableCell>
                                                    <TableCell>{lead.phone}</TableCell>
                                                    <TableCell>{lead.city}, {lead.district}</TableCell>
                                                    <TableCell>
                                                        <span className={`font-semibold ${lead.score >= 70 ? 'text-green-600' :
                                                                lead.score >= 50 ? 'text-blue-600' :
                                                                    lead.score >= 30 ? 'text-yellow-600' :
                                                                        'text-gray-500'
                                                            }`}>
                                                            {lead.score}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={status?.color || ''}>
                                                            {status?.label || lead.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={`/admin/leads/${lead.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
