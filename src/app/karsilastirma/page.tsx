import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Star, Zap, Sun, Battery, Shield } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Panel ve İnverter Karşılaştırma | GüneşKolay',
    description: 'JA Solar, Trina, LONGi, Huawei, Fronius gibi lider markaların detaylı karşılaştırması. Güneş paneli ve inverter seçiminde doğru karar verin.',
    keywords: 'güneş paneli karşılaştırma, JA Solar, Trina Solar, LONGi, Huawei inverter, Fronius, solar panel',
}

// Panel data
const panels = [
    {
        brand: 'JA Solar',
        country: 'Çin',
        efficiency: '21.3%',
        power: '410-620W',
        warranty: { product: 12, performance: 25 },
        technology: 'Yarım Hücre (Half-Cell)',
        tempCoeff: '-0.35%/°C',
        price: 'Orta',
        popularity: 5,
        pros: ['Fiyat/performans dengesi', 'Türkiye\'de yaygın servis', 'Güvenilir garanti'],
        cons: ['Premium segmentte değil'],
    },
    {
        brand: 'Trina Solar',
        country: 'Çin',
        efficiency: '21.6%',
        power: '405-670W',
        warranty: { product: 12, performance: 25 },
        technology: 'Vertex N-Type',
        tempCoeff: '-0.34%/°C',
        price: 'Orta-Yüksek',
        popularity: 4,
        pros: ['Yüksek verimlilik', 'İleri teknoloji', 'Global lider'],
        cons: ['Biraz daha pahalı'],
    },
    {
        brand: 'LONGi',
        country: 'Çin',
        efficiency: '22.0%',
        power: '430-600W',
        warranty: { product: 12, performance: 25 },
        technology: 'Hi-MO 6',
        tempCoeff: '-0.34%/°C',
        price: 'Orta-Yüksek',
        popularity: 4,
        pros: ['En yüksek verimlilik', 'Dünya lideri üretici', 'Ar-Ge odaklı'],
        cons: ['Türkiye\'de servis ağı sınırlı'],
    },
    {
        brand: 'Canadian Solar',
        country: 'Kanada/Çin',
        efficiency: '21.0%',
        power: '400-600W',
        warranty: { product: 12, performance: 25 },
        technology: 'TOPCon BiHiKu',
        tempCoeff: '-0.36%/°C',
        price: 'Yüksek',
        popularity: 3,
        pros: ['Güçlü marka imajı', 'Batı pazarında popüler', 'Çift yüzlü modeller'],
        cons: ['Fiyat yüksek'],
    },
    {
        brand: 'Jinko Solar',
        country: 'Çin',
        efficiency: '21.8%',
        power: '415-625W',
        warranty: { product: 12, performance: 30 },
        technology: 'Tiger Neo N-Type',
        tempCoeff: '-0.30%/°C',
        price: 'Orta',
        popularity: 4,
        pros: ['30 yıl performans garantisi', 'Düşük sıcaklık katsayısı', 'İnovatif'],
        cons: ['Daha yeni marka algısı'],
    },
]

// Inverter data
const inverters = [
    {
        brand: 'Huawei',
        country: 'Çin',
        type: 'String',
        power: '2-100 kW',
        efficiency: '98.6%',
        warranty: 10,
        monitoring: 'FusionSolar App',
        features: ['AI destekli', 'AFCI koruması', 'Akıllı I-V tarama'],
        price: 'Orta',
        popularity: 5,
    },
    {
        brand: 'Fronius',
        country: 'Avusturya',
        type: 'String',
        power: '1.5-27 kW',
        efficiency: '98.1%',
        warranty: 10,
        monitoring: 'Fronius Solar.web',
        features: ['Avrupa kalitesi', 'Modüler tasarım', 'Geniş voltaj aralığı'],
        price: 'Yüksek',
        popularity: 4,
    },
    {
        brand: 'SMA',
        country: 'Almanya',
        type: 'String',
        power: '2-75 kW',
        efficiency: '98.3%',
        warranty: 10,
        monitoring: 'Sunny Portal',
        features: ['Alman mühendisliği', 'Uzun ömür', 'Global servis'],
        price: 'Yüksek',
        popularity: 4,
    },
    {
        brand: 'Goodwe',
        country: 'Çin',
        type: 'String/Hibrit',
        power: '1-100 kW',
        efficiency: '98.4%',
        warranty: 10,
        monitoring: 'SEMS Portal',
        features: ['Uygun fiyat', 'Hibrit modeller', 'Kolay kurulum'],
        price: 'Düşük-Orta',
        popularity: 5,
    },
    {
        brand: 'Enphase',
        country: 'ABD',
        type: 'Mikro İnverter',
        power: '300-500W/panel',
        efficiency: '97.5%',
        warranty: 25,
        monitoring: 'Enlighten App',
        features: ['Panel bazlı optimizasyon', 'Gölge toleransı', '25 yıl garanti'],
        price: 'Çok Yüksek',
        popularity: 3,
    },
]

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i <= count ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                />
            ))}
        </div>
    )
}

export default function ComparisonPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="secondary" className="mb-4">
                            Karşılaştırma Merkezi
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Panel ve İnverter <span className="text-primary">Karşılaştırma</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                            Lider markaları yan yana karşılaştırın. Doğru ekipman seçimi için ihtiyacınız olan tüm bilgiler.
                        </p>
                    </div>
                </div>
            </section>

            {/* Panel Comparison */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Sun className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Güneş Panelleri</h2>
                            <p className="text-muted-foreground">Tier 1 panel markaları karşılaştırması</p>
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left p-4 font-semibold">Marka</th>
                                    <th className="text-left p-4 font-semibold">Verimlilik</th>
                                    <th className="text-left p-4 font-semibold">Güç</th>
                                    <th className="text-left p-4 font-semibold">Teknoloji</th>
                                    <th className="text-left p-4 font-semibold">Garanti</th>
                                    <th className="text-left p-4 font-semibold">Fiyat</th>
                                    <th className="text-left p-4 font-semibold">Popülerlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {panels.map((panel, i) => (
                                    <tr key={panel.brand} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                        <td className="p-4">
                                            <div className="font-semibold">{panel.brand}</div>
                                            <div className="text-xs text-muted-foreground">{panel.country}</div>
                                        </td>
                                        <td className="p-4 font-mono text-primary font-semibold">{panel.efficiency}</td>
                                        <td className="p-4">{panel.power}</td>
                                        <td className="p-4 text-sm">{panel.technology}</td>
                                        <td className="p-4 text-sm">{panel.warranty.product}y / {panel.warranty.performance}y</td>
                                        <td className="p-4">
                                            <Badge variant={panel.price === 'Orta' ? 'secondary' : 'outline'}>
                                                {panel.price}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <StarRating count={panel.popularity} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden grid gap-4">
                        {panels.map((panel) => (
                            <Card key={panel.brand}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{panel.brand}</CardTitle>
                                            <p className="text-xs text-muted-foreground">{panel.country}</p>
                                        </div>
                                        <Badge variant="secondary">{panel.efficiency}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className="text-muted-foreground">Güç:</span> {panel.power}</div>
                                        <div><span className="text-muted-foreground">Garanti:</span> {panel.warranty.performance}y</div>
                                        <div><span className="text-muted-foreground">Fiyat:</span> {panel.price}</div>
                                        <div><StarRating count={panel.popularity} /></div>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-muted-foreground">Teknoloji:</span> {panel.technology}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {panel.pros.map((pro, i) => (
                                            <Badge key={i} variant="outline" className="text-xs text-green-600">
                                                <Check className="h-3 w-3 mr-1" /> {pro}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inverter Comparison */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">İnverterler</h2>
                            <p className="text-muted-foreground">String ve mikro inverter karşılaştırması</p>
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left p-4 font-semibold">Marka</th>
                                    <th className="text-left p-4 font-semibold">Tip</th>
                                    <th className="text-left p-4 font-semibold">Verimlilik</th>
                                    <th className="text-left p-4 font-semibold">Güç Aralığı</th>
                                    <th className="text-left p-4 font-semibold">Garanti</th>
                                    <th className="text-left p-4 font-semibold">Özellikler</th>
                                    <th className="text-left p-4 font-semibold">Fiyat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inverters.map((inv, i) => (
                                    <tr key={inv.brand} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                        <td className="p-4">
                                            <div className="font-semibold">{inv.brand}</div>
                                            <div className="text-xs text-muted-foreground">{inv.country}</div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline">{inv.type}</Badge>
                                        </td>
                                        <td className="p-4 font-mono text-primary font-semibold">{inv.efficiency}</td>
                                        <td className="p-4">{inv.power}</td>
                                        <td className="p-4">{inv.warranty} yıl</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {inv.features.slice(0, 2).map((f, j) => (
                                                    <Badge key={j} variant="secondary" className="text-xs">{f}</Badge>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={inv.price === 'Düşük-Orta' || inv.price === 'Orta' ? 'secondary' : 'outline'}>
                                                {inv.price}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden grid gap-4">
                        {inverters.map((inv) => (
                            <Card key={inv.brand}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{inv.brand}</CardTitle>
                                            <p className="text-xs text-muted-foreground">{inv.country}</p>
                                        </div>
                                        <Badge variant="outline">{inv.type}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className="text-muted-foreground">Verimlilik:</span> {inv.efficiency}</div>
                                        <div><span className="text-muted-foreground">Güç:</span> {inv.power}</div>
                                        <div><span className="text-muted-foreground">Garanti:</span> {inv.warranty} yıl</div>
                                        <div><span className="text-muted-foreground">Fiyat:</span> {inv.price}</div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {inv.features.map((f, i) => (
                                            <Badge key={i} variant="secondary" className="text-xs">{f}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Selection Tips */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <Card className="bg-muted/30">
                        <CardContent className="p-6 md:p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Doğru Seçim İçin İpuçları
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-3">Panel Seçerken</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Sadece Tier 1 markalardan seçim yapın
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Performans garantisi en az 25 yıl olmalı
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Türkiye&apos;de yetkili distribütör kontrolü yapın
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Sıcak bölgelerde düşük sıcaklık katsayısı önemli
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-3">İnverter Seçerken</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Sistem kapasitesine uygun güç seçin
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Gölgelenme varsa mikro inverter düşünün
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Mobil izleme uygulaması olmalı
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            Yerel teknik servis desteği araştırın
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <Card className="gradient-primary text-white overflow-hidden">
                        <CardContent className="p-8 md:p-12 text-center relative">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">
                                Hangi Ekipman Size Uygun?
                            </h2>
                            <p className="opacity-90 mb-6 max-w-md mx-auto">
                                Uzman firmalardan ücretsiz teklif alın, size özel sistem önerisi alın.
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
