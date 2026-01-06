import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Zap, Calendar, Building2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Referans Projeler | GüneşKolay',
    description: 'GüneşKolay aracılığıyla gerçekleştirilen güneş enerjisi projeleri. Konut, ticari ve endüstriyel kurulum örneklerimizi inceleyin.',
    keywords: 'güneş enerjisi projeleri, GES kurulum, solar panel referans, çatı GES',
}

// Reference projects data
const projects = [
    {
        id: 1,
        title: 'Villa Çatı GES Kurulumu',
        location: 'Antalya, Konyaaltı',
        type: 'Konut',
        capacity: '10 kWp',
        panels: 'JA Solar 550W x 18',
        inverter: 'Huawei SUN2000-10KTL',
        date: '2025-11',
        savings: '%85 elektrik tasarrufu',
        description: 'Müstakil villa çatısına kurulum yapıldı. Sistem, evin tüm elektrik ihtiyacını karşılıyor.',
        gradient: 'from-orange-500 to-amber-500',
    },
    {
        id: 2,
        title: 'Fabrika Çatı GES',
        location: 'İstanbul, Tuzla OSB',
        type: 'Endüstriyel',
        capacity: '250 kWp',
        panels: 'Trina Vertex 600W x 416',
        inverter: 'Huawei SUN2000-100KTL x 2',
        date: '2025-10',
        savings: '%70 enerji maliyeti düşüşü',
        description: 'Tekstil fabrikası çatısına kurulum. Yıllık 300.000+ kWh üretim kapasitesi.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        id: 3,
        title: 'Tarım Arazisi GES',
        location: 'Konya, Karatay',
        type: 'Arazi',
        capacity: '500 kWp',
        panels: 'LONGi Hi-MO 6 580W x 862',
        inverter: 'Huawei SUN2000-100KTL x 5',
        date: '2025-09',
        savings: 'Yıllık 650.000 kWh üretim',
        description: 'Tarım arazisine kurulu ground-mount sistem. Çift yüzlü paneller ile maksimum verim.',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        id: 4,
        title: 'AVM Çatı Kurulumu',
        location: 'Ankara, Çankaya',
        type: 'Ticari',
        capacity: '150 kWp',
        panels: 'Canadian Solar 600W x 250',
        inverter: 'SMA Sunny Tripower',
        date: '2025-08',
        savings: '%60 elektrik faturası düşüşü',
        description: 'Alışveriş merkezi çatısına kurulum. Klima yükünü karşılayan sistem tasarımı.',
        gradient: 'from-violet-500 to-purple-500',
    },
    {
        id: 5,
        title: 'Apartman Çatı GES',
        location: 'İzmir, Bornova',
        type: 'Konut',
        capacity: '30 kWp',
        panels: 'Jinko Tiger Neo 550W x 54',
        inverter: 'Fronius Symo 30.0-3',
        date: '2025-07',
        savings: '12 daire ortak alan elektriği',
        description: '5 katlı apartman çatısına kurulum. Ortak alan aydınlatma ve asansör elektriği karşılanıyor.',
        gradient: 'from-rose-500 to-pink-500',
    },
    {
        id: 6,
        title: 'Otel Çatı Sistemi',
        location: 'Muğla, Bodrum',
        type: 'Ticari',
        capacity: '75 kWp',
        panels: 'JA Solar 550W x 136',
        inverter: 'Goodwe GW75K-MT',
        date: '2025-06',
        savings: 'Sezonluk %90 tasarruf',
        description: 'Butik otel çatısına kurulum. Yaz sezonunda havuz ve klima yükünü karşılıyor.',
        gradient: 'from-teal-500 to-cyan-500',
    },
]

const stats = [
    { value: '1.5+ MW', label: 'Toplam Kurulu Güç' },
    { value: '50+', label: 'Tamamlanan Proje' },
    { value: '81 İl', label: 'Hizmet Kapsaması' },
    { value: '%95+', label: 'Müşteri Memnuniyeti' },
]

function getTypeIcon(type: string) {
    switch (type) {
        case 'Konut': return '🏠'
        case 'Ticari': return '🏢'
        case 'Endüstriyel': return '🏭'
        case 'Arazi': return '🌾'
        default: return '☀️'
    }
}

export default function ReferencesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="secondary" className="mb-4">
                            Referans Projeler
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Başarıyla Tamamlanan <span className="text-primary">Projelerimiz</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                            Türkiye genelinde gerçekleştirdiğimiz konut, ticari ve endüstriyel güneş enerjisi kurulumları.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <Card key={i} className="text-center">
                                <CardContent className="p-6">
                                    <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                {/* Gradient Header */}
                                <div className={`h-32 bg-gradient-to-br ${project.gradient} relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-5xl">{getTypeIcon(project.type)}</span>
                                    </div>
                                    <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur text-white border-0">
                                        {project.capacity}
                                    </Badge>
                                </div>

                                <CardContent className="p-5">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Badge variant="outline" className="text-xs">{project.type}</Badge>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {project.location}
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground mb-4">
                                        {project.description}
                                    </p>

                                    <div className="space-y-2 text-sm border-t pt-4">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-primary shrink-0" />
                                            <span className="text-muted-foreground">Panel:</span>
                                            <span className="truncate">{project.panels.split(' x ')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-primary shrink-0" />
                                            <span className="text-muted-foreground">İnverter:</span>
                                            <span className="truncate">{project.inverter.split(' x ')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-primary shrink-0" />
                                            <span className="text-muted-foreground">Tarih:</span>
                                            <span>{new Date(project.date + '-01').toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium">
                                        ✓ {project.savings}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <Card className="gradient-primary text-white overflow-hidden">
                        <CardContent className="p-8 md:p-12 text-center relative">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">
                                Sıradaki Proje Sizinki Olsun!
                            </h2>
                            <p className="opacity-90 mb-6 max-w-md mx-auto">
                                Ücretsiz keşif ve teklif için hemen başvurun. Uzmanlarımız size özel çözüm sunacak.
                            </p>
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/teklif-al">
                                    Ücretsiz Teklif Al
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full" />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
