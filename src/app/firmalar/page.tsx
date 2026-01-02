import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getApprovedInstallers } from '@/app/actions/installers'
import { MapPin, Users, Building2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Doğrulanmış Güneş Enerjisi Firmaları',
    description: 'Türkiye genelinde doğrulanmış güneş enerjisi kurulum firmaları. Güvenilir firmalardan teklif alın.',
    openGraph: {
        title: 'Doğrulanmış Güneş Enerjisi Firmaları | GüneşKolay',
        description: 'Türkiye genelinde doğrulanmış güneş enerjisi kurulum firmaları.',
    },
}

export const dynamic = 'force-dynamic'

export default async function FirmalarPage() {
    const installers = await getApprovedInstallers()

    return (
        <div className="min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Doğrulanmış Firmalar
                    </h1>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Tüm firmalar tek tek doğrulanmıştır.
                        Güvenle teklif alabilirsiniz.
                    </p>
                </div>

                {installers.length === 0 ? (
                    <div className="text-center py-12">
                        <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Henüz firma eklenmedi</h2>
                        <p className="text-muted-foreground mb-6">
                            Firmalar onaylandıkça burada listelenecek.
                        </p>
                        <Button asChild>
                            <Link href="/firma-katil">Firma Olarak Başvur</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {installers.map((installer) => (
                            <Card key={installer.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">{installer.company_name}</CardTitle>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            Doğrulandı
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                                        <div className="flex flex-wrap gap-1">
                                            {installer.regions.slice(0, 3).map((region: string) => (
                                                <Badge key={region} variant="outline" className="text-xs">
                                                    {region}
                                                </Badge>
                                            ))}
                                            {installer.regions.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{installer.regions.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {installer.has_inhouse_install_team
                                                ? 'Kendi kurulum ekibi'
                                                : 'Taşeron ekip'}
                                        </span>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        Kapasite: {installer.capacity_per_month}+ kurulum/ay
                                    </div>

                                    <Button className="w-full mt-4" asChild>
                                        <Link href="/teklif-al">Teklif İste</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        Güneş enerjisi firması mısınız?
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/firma-katil">Platforma Katılın</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
