import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, Sun, Zap, FileText, TrendingUp, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Blog | Güneş Enerjisi Rehberi | GüneşKolay',
    description: 'Güneş enerjisi hakkında kapsamlı rehberler, güncel teşvikler, panel karşılaştırmaları ve yatırım analizleri. Doğru kararlar için bilgi kaynağınız.',
    keywords: 'güneş enerjisi, solar panel, GES, devlet teşviki, on-grid, off-grid, güneş paneli maliyet',
}

// Blog posts data
const blogPosts = [
    {
        slug: 'gunes-paneli-nasil-calisir',
        title: 'Güneş Paneli Nasıl Çalışır? Kapsamlı Teknik Rehber',
        excerpt: 'Fotovoltaik hücrelerin çalışma prensibi, panel türleri ve verimlilik faktörleri hakkında detaylı bilgi.',
        category: 'Teknik',
        readTime: '8 dk',
        date: '2026-01-02',
        icon: Sun,
        featured: true,
    },
    {
        slug: 'devlet-tesvikleri-2026',
        title: '2026 Güneş Enerjisi Devlet Teşvikleri ve Destekler',
        excerpt: 'YEKDEM, lisanssız elektrik üretimi, vergi avantajları ve kredi destekleri hakkında güncel bilgiler.',
        category: 'Teşvikler',
        readTime: '6 dk',
        date: '2026-01-01',
        icon: FileText,
        featured: true,
    },
    {
        slug: 'on-grid-vs-off-grid',
        title: 'On-Grid vs Off-Grid: Hangi Sistem Size Uygun?',
        excerpt: 'Şebekeye bağlı ve bağımsız sistemlerin karşılaştırması, avantajları ve dezavantajları.',
        category: 'Karşılaştırma',
        readTime: '7 dk',
        date: '2025-12-28',
        icon: Zap,
        featured: false,
    },
    {
        slug: 'panel-secim-rehberi',
        title: 'Güneş Paneli Seçim Rehberi: Hangi Markayı Almalı?',
        excerpt: 'JA Solar, Trina, LONGi, Canadian Solar gibi markaların karşılaştırması ve seçim kriterleri.',
        category: 'Rehber',
        readTime: '10 dk',
        date: '2025-12-25',
        icon: HelpCircle,
        featured: false,
    },
    {
        slug: 'ges-maliyet-analizi',
        title: 'GES Maliyet Analizi: Ne Kadar Yatırım Gerekiyor?',
        excerpt: '2026 yılı güncel fiyatları, kWp başına maliyet ve yatırım geri dönüş süreleri.',
        category: 'Maliyet',
        readTime: '9 dk',
        date: '2025-12-20',
        icon: TrendingUp,
        featured: false,
    },
]

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function BlogPage() {
    const featuredPosts = blogPosts.filter(post => post.featured)
    const regularPosts = blogPosts.filter(post => !post.featured)

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="secondary" className="mb-4">
                            Bilgi Merkezi
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Güneş Enerjisi <span className="text-primary">Rehberi</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                            Doğru kararlar vermek için ihtiyacınız olan tüm bilgiler.
                            Teknik detaylardan teşviklere, maliyetlerden tasarrufa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="pb-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Öne Çıkan Yazılar</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredPosts.map((post) => {
                            const Icon = post.icon
                            return (
                                <Link key={post.slug} href={`/blog/${post.slug}`}>
                                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <Icon className="h-7 w-7" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-4 text-primary text-sm font-medium">
                                                        Devamını Oku
                                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* All Posts */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Tüm Yazılar</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularPosts.map((post) => {
                            const Icon = post.icon
                            return (
                                <Link key={post.slug} href={`/blog/${post.slug}`}>
                                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                                        <CardContent className="p-5">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                                <Badge variant="outline" className="text-xs">{post.category}</Badge>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(post.date)}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {post.readTime}
                                                </span>
                                                <span className="text-primary text-sm font-medium flex items-center gap-1">
                                                    Oku
                                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <Card className="gradient-primary text-white overflow-hidden">
                        <CardContent className="p-8 md:p-12 text-center relative">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">
                                Hala Sorularınız mı Var?
                            </h2>
                            <p className="opacity-90 mb-6 max-w-md mx-auto">
                                Uzmanlarımız size özel analiz yaparak tüm sorularınızı yanıtlasın.
                            </p>
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/teklif-al">
                                    Ücretsiz Danışmanlık Al
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
