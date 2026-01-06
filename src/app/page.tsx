import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedCounter } from '@/components/animated-counter'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Shield,
  FileCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  TrendingUp
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in">
              Güneş yatırımında yanlış firmaya{' '}
              <span className="text-primary">para kaptırma.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Doğrulanmış firmalar + niyet filtresiyle sadece ciddi teklifleri gör.
              Dolandırılma riskini minimuma indir.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/teklif-al">
                  Ücretsiz Teklif Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/firma-katil">Firma Olarak Katıl</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Doğrulama</h3>
                <p className="text-sm text-muted-foreground">Her firma tek tek doğrulanır</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Şeffaf Teklif</h3>
                <p className="text-sm text-muted-foreground">Gizli maliyet yok</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Süreç Takibi</h3>
                <p className="text-sm text-muted-foreground">Başından sonuna takip</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Nasıl Çalışır?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              3 adımda güvenilir teklife ulaş
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20">1</div>
              <CardContent className="pt-8 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white mb-6">
                  <FileCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Formu Doldur</h3>
                <p className="text-muted-foreground">
                  Mülk bilgilerini ve enerji ihtiyacını paylaş. Sadece 2 dakika sürer.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20">2</div>
              <CardContent className="pt-8 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white mb-6">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Firmalarla Eşleş</h3>
                <p className="text-muted-foreground">
                  Bölgendeki doğrulanmış firmalarla otomatik eşleştirme yapılır.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20">3</div>
              <CardContent className="pt-8 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white mb-6">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Teklifleri Karşılaştır</h3>
                <p className="text-muted-foreground">
                  Şeffaf teklifleri değerlendir, en uygun firmayı seç.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/teklif-al">
                Hemen Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <AnimatedCounter />

      {/* Testimonials Placeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Müşteri Görüşleri</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Ahmet Y.',
                location: 'İstanbul',
                text: 'Birçok firmadan teklif almıştım ama hangisine güveneceğimi bilmiyordum. GüneşKolay sayesinde doğrulanmış bir firmayla çalıştım.',
              },
              {
                name: 'Fatma K.',
                location: 'Antalya',
                text: 'Süreç çok şeffaftı. Ne ödeyeceğimi en başından biliyordum. Hiçbir sürpriz çıkmadı.',
              },
              {
                name: 'Mehmet A.',
                location: 'Ankara',
                text: 'Enerji faturamız %80 düştü. Doğru firmayı bulmamıza yardımcı olan GüneşKolay ekibine teşekkürler.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Sıkça Sorulan Sorular</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="1">
                <AccordionTrigger>GüneşKolay ücretsiz mi?</AccordionTrigger>
                <AccordionContent>
                  Evet, ev sahipleri için tamamen ücretsiz. Teklif almak, firmaları karşılaştırmak
                  ve iletişime geçmek için hiçbir ücret ödemezsiniz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="2">
                <AccordionTrigger>Firmalar nasıl doğrulanıyor?</AccordionTrigger>
                <AccordionContent>
                  Her firma başvurusunu tek tek inceliyoruz. Vergi kaydı, referanslar,
                  tamamlanmış projeler ve müşteri yorumlarını kontrol ediyoruz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="3">
                <AccordionTrigger>Kaç teklif alabilirim?</AccordionTrigger>
                <AccordionContent>
                  Bölgenize göre 1-3 arası doğrulanmış firmadan teklif alabilirsiniz.
                  Kalite odaklı çalışıyoruz, çok fazla firma ile boğulmayacaksınız.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="4">
                <AccordionTrigger>Teklif ne kadar sürede gelir?</AccordionTrigger>
                <AccordionContent>
                  Genellikle 24-48 saat içinde firmalardan dönüş alırsınız.
                  Keşif ziyareti gerekebilir, bu durumda süre biraz uzayabilir.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="5">
                <AccordionTrigger>Hangi panel markalarını öneriyorsunuz?</AccordionTrigger>
                <AccordionContent>
                  Özel bir marka önermiyoruz. Firmalar farklı markalarla çalışır.
                  Tekliflerde marka ve garanti bilgilerini görebilirsiniz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="6">
                <AccordionTrigger>Site/apartmanda kurulum yapılabilir mi?</AccordionTrigger>
                <AccordionContent>
                  Evet, ama yönetim izni gerekir. Formda bunu belirtirseniz uygun
                  firmalarla eşleştirilirsiniz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="7">
                <AccordionTrigger>Devlet teşvikleri hakkında bilgi verir misiniz?</AccordionTrigger>
                <AccordionContent>
                  Firmalar güncel teşvik ve lisanslama süreçleri hakkında bilgi verecektir.
                  Ayrıca blog yazılarımızda detaylı bilgiler paylaşıyoruz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="8">
                <AccordionTrigger>Verilerim güvende mi?</AccordionTrigger>
                <AccordionContent>
                  Evet, KVKK kapsamında verilerinizi koruyoruz. Bilgileriniz sadece
                  teklif sürecinde kullanılır ve üçüncü şahıslarla paylaşılmaz.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto gradient-primary text-white overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Güneş Enerjisine Geçmeye Hazır mısın?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Doğrulanmış firmalardan ücretsiz teklif al. Risk yok, taahhüt yok.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/teklif-al">
                  Hemen Teklif Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
