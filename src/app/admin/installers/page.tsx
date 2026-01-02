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
import { ArrowLeft, Sun } from 'lucide-react'
import { INSTALLER_STATUSES } from '@/lib/constants'
import { InstallerStatusButtons } from './installer-status-buttons'

export const metadata: Metadata = {
    title: 'Firma Yönetimi | Admin',
    robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminInstallersPage({
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
        .from('installers')
        .select('*')
        .order('created_at', { ascending: false })

    if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
    }

    const { data: installers, error } = await query.limit(100)

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
                        <h1 className="text-lg font-semibold">Firma Yönetimi</h1>
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
                        <Link href="/admin/installers">Tümü</Link>
                    </Button>
                    {INSTALLER_STATUSES.map((status) => (
                        <Button
                            key={status.value}
                            variant={statusFilter === status.value ? 'default' : 'outline'}
                            size="sm"
                            asChild
                        >
                            <Link href={`/admin/installers?status=${status.value}`}>{status.label}</Link>
                        </Button>
                    ))}
                </div>

                {/* Installers Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Firmalar ({installers?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!installers || installers.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">
                                Henüz firma başvurusu bulunmuyor.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tarih</TableHead>
                                            <TableHead>Firma</TableHead>
                                            <TableHead>VKN</TableHead>
                                            <TableHead>İletişim</TableHead>
                                            <TableHead>Bölgeler</TableHead>
                                            <TableHead>Durum</TableHead>
                                            <TableHead>İşlemler</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {installers.map((installer) => {
                                            const status = INSTALLER_STATUSES.find((s) => s.value === installer.status)
                                            return (
                                                <TableRow key={installer.id}>
                                                    <TableCell className="whitespace-nowrap">
                                                        {new Date(installer.created_at).toLocaleDateString('tr-TR')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{installer.company_name}</p>
                                                            <p className="text-sm text-muted-foreground">{installer.contact_name}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono">{installer.vkn}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            <p>{installer.phone}</p>
                                                            <p className="text-muted-foreground">{installer.email}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                            {installer.regions.slice(0, 2).map((region: string) => (
                                                                <Badge key={region} variant="outline" className="text-xs">
                                                                    {region}
                                                                </Badge>
                                                            ))}
                                                            {installer.regions.length > 2 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{installer.regions.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={status?.color || ''}>
                                                            {status?.label || installer.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <InstallerStatusButtons
                                                            installerId={installer.id}
                                                            currentStatus={installer.status}
                                                        />
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
