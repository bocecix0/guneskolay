import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/actions/auth'
import {
    Users,
    Building2,
    LogOut,
    Sun,
    FileText,
    TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    robots: { index: false, follow: false },
}

export default async function AdminPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Get stats
    const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })

    const { count: newLeadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')

    const { count: installersCount } = await supabase
        .from('installers')
        .select('*', { count: 'exact', head: true })

    const { count: pendingInstallersCount } = await supabase
        .from('installers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <header className="bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                            <Sun className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">GüneşKolay Admin</h1>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <form action={signOut}>
                        <Button variant="ghost" size="sm" type="submit">
                            <LogOut className="h-4 w-4 mr-2" />
                            Çıkış
                        </Button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className="text-muted-foreground">Genel bakış ve hızlı erişim</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Lead</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{leadsCount || 0}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Yeni Leadler</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{newLeadsCount || 0}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Firma</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{installersCount || 0}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Onay Bekleyen</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{pendingInstallersCount || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Access */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Lead Yönetimi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Gelen başvuruları görüntüle, durumlarını güncelle ve firma ata.
                            </p>
                            <Button asChild>
                                <Link href="/admin/leads">Leadleri Görüntüle</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Firma Yönetimi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Firma başvurularını incele, onayla veya reddet.
                            </p>
                            <Button asChild>
                                <Link href="/admin/installers">Firmaları Görüntüle</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
