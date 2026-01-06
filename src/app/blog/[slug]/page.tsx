import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Sun } from 'lucide-react'

// Blog content database
const blogContent: Record<string, {
    title: string
    description: string
    category: string
    readTime: string
    date: string
    content: string
}> = {
    'gunes-paneli-nasil-calisir': {
        title: 'Güneş Paneli Nasıl Çalışır? Kapsamlı Teknik Rehber',
        description: 'Fotovoltaik hücrelerin çalışma prensibi, panel türleri ve verimlilik faktörleri hakkında detaylı bilgi.',
        category: 'Teknik',
        readTime: '8 dk',
        date: '2026-01-02',
        content: `
## Güneş Enerjisinin Temel Prensibi

Güneş panelleri, güneş ışığını doğrudan elektrik enerjisine dönüştüren **fotovoltaik (PV) teknolojisi** kullanır. Bu süreç, 1839 yılında Fransız fizikçi Edmond Becquerel tarafından keşfedilen fotovoltaik etkiye dayanır.

### Fotovoltaik Etki Nasıl Çalışır?

1. **Foton Emilimi**: Güneş ışığı (fotonlar) silikon hücrelere çarptığında, elektronları serbest bırakır.
2. **Elektrik Alanı**: Paneldeki P-N bağlantısı bir elektrik alanı oluşturur.
3. **Elektron Akışı**: Serbest elektronlar bu alan boyunca hareket ederek elektrik akımı oluşturur.
4. **DC Elektrik**: Panel çıkışında doğru akım (DC) elektrik üretilir.

## Panel Türleri ve Özellikleri

### 1. Monokristal Paneller
- **Verimlilik**: %20-23
- **Görünüm**: Siyah, düzgün yüzey
- **Avantaj**: En yüksek verimlilik, uzun ömür (25+ yıl)
- **Dezavantaj**: Daha yüksek maliyet

### 2. Polikristal Paneller
- **Verimlilik**: %15-17
- **Görünüm**: Mavi, kristal desenli
- **Avantaj**: Uygun fiyat
- **Dezavantaj**: Düşük verimlilik, daha fazla alan gerektirir

### 3. İnce Film Paneller
- **Verimlilik**: %10-13
- **Görünüm**: Esnek, ince yapı
- **Avantaj**: Hafif, esnek uygulama
- **Dezavantaj**: En düşük verimlilik

## Verimlilik Faktörleri

### Sıcaklık Etkisi
Her 1°C sıcaklık artışında panel verimi yaklaşık **%0.4-0.5** düşer. Bu yüzden panellerin havalandırması önemlidir.

### Eğim ve Yönelim
Türkiye için ideal eğim açısı **30-35 derece**, yönelim ise **tam güney**tir. Yanlış açı, verimi %25'e kadar düşürebilir.

### Gölgelenme
Tek bir hücrenin bile gölgelenmesi tüm panelin verimini dramatik şekilde düşürebilir. Modern paneller bypass diyotları ile bu etkiyi azaltır.

## Sistem Bileşenleri

| Bileşen | Görevi | Ömür |
|---------|--------|------|
| Panel | Elektrik üretimi | 25-30 yıl |
| İnverter | DC→AC dönüşüm | 10-15 yıl |
| Kablolama | Elektrik iletimi | 25+ yıl |
| Montaj Sistemi | Panel sabitleme | 25+ yıl |
| Sayaç | Üretim/tüketim ölçümü | 15+ yıl |

## Sonuç

Güneş panelleri, temiz ve yenilenebilir enerji üretmenin en verimli yollarından biridir. Doğru panel seçimi ve kurulum yapıldığında, 25+ yıl boyunca güvenilir elektrik üretimi sağlar.
        `,
    },
    'devlet-tesvikleri-2026': {
        title: '2026 Güneş Enerjisi Devlet Teşvikleri ve Destekler',
        description: 'YEKDEM, lisanssız elektrik üretimi, vergi avantajları ve kredi destekleri hakkında güncel bilgiler.',
        category: 'Teşvikler',
        readTime: '6 dk',
        date: '2026-01-01',
        content: `
## 2026 Yılı Güncel Teşvik Programları

Türkiye, güneş enerjisi yatırımlarını teşvik etmek için çeşitli destek mekanizmaları sunmaktadır. İşte 2026 yılında geçerli olan tüm teşvikler:

## 1. YEKDEM (Yenilenebilir Enerji Kaynakları Destekleme Mekanizması)

### Alım Garantisi
- **Güneş enerjisi**: 10 yıl boyunca sabit alım garantisi
- **Fiyat**: Piyasa fiyatı + teşvik primi
- **Yerli katkı**: Yerli ekipman kullanımında ek bonus

### Başvuru Koşulları
- Kurulu güç: 1 MW üzeri tesisler için
- Lisans gereksinimi: EPDK'dan lisans alınması

## 2. Lisanssız Elektrik Üretimi

### 10 kW Altı Konut Sistemleri
- **Lisans**: Gerekmiyor
- **Sayaç**: Net metering (çift yönlü sayaç)
- **Fazla üretim**: Şebekeye satış hakkı
- **Belge**: Basitleştirilmiş başvuru süreci

### 10 kW - 1 MW Arası Sistemler
- **Lisans**: Gerekmiyor, ancak bağlantı anlaşması şart
- **Süre**: 10 yıl üretim hakkı
- **Satış**: Perakende satış fiyatı üzerinden

## 3. Vergi Avantajları

### KDV İndirimi
- **Oran**: %1 KDV (normal %20 yerine)
- **Kapsam**: Panel, inverter, montaj sistemi
- **Koşul**: Konut ve tüketim amaçlı kurulumlar

### Gümrük Muafiyeti
- Yatırım teşvik belgesi kapsamında
- Belirli ekipmanlar için %0 gümrük vergisi

### Kurumlar Vergisi İndirimi
- Organize sanayi bölgelerinde %50'ye varan indirim
- Yatırım döneminde vergi ertelemesi

## 4. Kredi Destekleri

### Kalkınma Bankası Kredileri
- **Faiz**: Piyasa altı faiz oranları
- **Vade**: 10 yıla kadar
- **Ödemesiz dönem**: 2 yıla kadar

### Ticari Banka Paketleri
| Banka | Vade | Faiz | Özellik |
|-------|------|------|---------|
| Ziraat Bankası | 120 ay | Düşük | Çiftçilere özel |
| Halkbank | 96 ay | Orta | Esnaf desteği |
| İş Bankası | 84 ay | Orta | Hızlı onay |

## 5. Belediye Destekleri

### İmar Kolaylıkları
- Çatı GES için imar izni gerektirmez
- Arazi GES için hızlandırılmış süreç

### Emlak Vergisi
- Bazı belediyelerde GES için emlak vergisi indirimi

## Başvuru Süreci

1. **Ön Fizibilite**: Enerji tüketim analizi
2. **Proje Hazırlama**: Teknik proje ve mühendislik
3. **Başvuru**: TEDAŞ veya ilgili dağıtım şirketine
4. **Onay**: Bağlantı anlaşması imzası
5. **Kurulum**: Panel montajı ve devreye alma
6. **Kabul**: Resmi kabul ve sayaç aktivasyonu

## Dikkat Edilmesi Gerekenler

> **Önemli**: Teşvik miktarları ve koşulları yıllık olarak değişebilir. Güncel bilgi için EPDK ve TEDAŞ web sitelerini kontrol edin.

- Başvuru süreleri sınırlı olabilir
- Bölgesel farklılıklar mevcut
- Profesyonel danışmanlık önerilir
        `,
    },
    'on-grid-vs-off-grid': {
        title: 'On-Grid vs Off-Grid: Hangi Sistem Size Uygun?',
        description: 'Şebekeye bağlı ve bağımsız sistemlerin karşılaştırması, avantajları ve dezavantajları.',
        category: 'Karşılaştırma',
        readTime: '7 dk',
        date: '2025-12-28',
        content: `
## Güneş Enerjisi Sistem Türleri

Güneş enerjisi sistemleri temel olarak üç kategoriye ayrılır. Her birinin kendine özgü avantajları ve kullanım senaryoları vardır.

## 1. On-Grid (Şebekeye Bağlı) Sistemler

### Nasıl Çalışır?
- Paneller elektrik üretir
- İnverter DC'yi AC'ye çevirir
- Üretim önce evinizde tüketilir
- Fazla üretim şebekeye satılır
- Eksik kaldığında şebekeden çekilir

### Avantajları
✅ **Düşük maliyet**: Batarya gerektirmez
✅ **Net metering**: Fazla üretimi satabilirsiniz
✅ **Basit kurulum**: Daha az bileşen
✅ **Verimli**: Enerji israfı minimum
✅ **Bakım kolaylığı**: Daha az parça

### Dezavantajları
❌ Elektrik kesintilerinde çalışmaz
❌ Şebekeye bağımlılık devam eder
❌ Gece tüketimi şebekeden karşılanır

### Kimler İçin Uygun?
- Şehirde yaşayanlar
- Elektrik kesintisi nadir olan bölgeler
- Maliyet bilincli kullanıcılar
- Yatırım geri dönüşü önemli olanlar

## 2. Off-Grid (Şebekeden Bağımsız) Sistemler

### Nasıl Çalışır?
- Paneller elektrik üretir
- Şarj kontrol cihazı bataryaları doldurur
- İnverter bataryadan AC üretir
- Tüm elektrik bataryadan karşılanır

### Avantajları
✅ **Tam bağımsızlık**: Şebeke gerekmez
✅ **Kesintisiz güç**: 7/24 elektrik
✅ **Uzak bölgeler**: Elektrik olmayan yerlere uygun
✅ **Enerji güvenliği**: Dış faktörlerden etkilenmez

### Dezavantajları
❌ **Yüksek maliyet**: Batarya pahalı
❌ **Batarya ömrü**: 5-10 yıl değişim gerekir
❌ **Kapasite sınırı**: Tüketim planlaması şart
❌ **Karmaşık sistem**: Daha fazla bakım

### Kimler İçin Uygun?
- Kırsal bölgeler
- Elektrik altyapısı olmayan yerler
- Tam enerji bağımsızlığı isteyenler
- Çiftlik, yayla, dağ evleri

## 3. Hibrit Sistemler

### Nasıl Çalışır?
- On-grid + batarya kombinasyonu
- Normal zamanlarda şebekeyle çalışır
- Kesinti olduğunda bataryaya geçer
- Gece tüketimi için enerji depolar

### Avantajları
✅ Her iki sistemin avantajlarını birleştirir
✅ Kesintilerde yedek güç sağlar
✅ Gece tüketimini optimize eder
✅ Enerji maliyetini minimize eder

### Dezavantajları
❌ En yüksek başlangıç maliyeti
❌ Karmaşık sistem tasarımı

## Karşılaştırma Tablosu

| Özellik | On-Grid | Off-Grid | Hibrit |
|---------|---------|----------|--------|
| Başlangıç Maliyeti | Düşük | Yüksek | En Yüksek |
| Batarya | Yok | Zorunlu | Opsiyonel |
| Kesintide Çalışma | Hayır | Evet | Evet |
| Bakım | Kolay | Zor | Orta |
| Geri Dönüş Süresi | 3-5 yıl | 7-10 yıl | 5-7 yıl |
| Şebeke Bağımlılığı | Var | Yok | Kısmi |

## Karar Rehberi

### On-Grid Seçin Eğer:
- Şehirde yaşıyorsanız
- Yatırım geri dönüşü öncelikliyse
- Elektrik kesintisi nadir yaşanıyorsa

### Off-Grid Seçin Eğer:
- Elektrik şebekesi yoksa
- Tam bağımsızlık istiyorsanız
- Uzak bir bölgedeyseniz

### Hibrit Seçin Eğer:
- Kesintisiz güç kritikse
- Bütçeniz yeterliyse
- Gece tüketimi yüksekse

## Sonuç

Çoğu konut kullanıcısı için **on-grid sistem** en mantıklı tercihtir. Düşük maliyet, basit kurulum ve hızlı yatırım geri dönüşü sunar. Özel ihtiyaçlarınız varsa profesyonel bir danışmandan yardım alın.
        `,
    },
    'panel-secim-rehberi': {
        title: 'Güneş Paneli Seçim Rehberi: Hangi Markayı Almalı?',
        description: 'JA Solar, Trina, LONGi, Canadian Solar gibi markaların karşılaştırması ve seçim kriterleri.',
        category: 'Rehber',
        readTime: '10 dk',
        date: '2025-12-25',
        content: `
## Panel Seçiminde Dikkat Edilmesi Gerekenler

Güneş paneli seçimi, sisteminizin 25+ yıllık performansını doğrudan etkiler. Doğru karar için bu kriterleri değerlendirin.

## Temel Seçim Kriterleri

### 1. Verimlilik (Efficiency)
- **Tanım**: Güneş ışığının ne kadarının elektriğe dönüştürüldüğü
- **İyi seviye**: %20 ve üzeri
- **Önemi**: Sınırlı çatı alanında daha fazla üretim

### 2. Güç Çıkışı (Watt)
- **Konut için**: 400-550W paneller yaygın
- **Hesaplama**: Toplam ihtiyaç / panel gücü = panel sayısı
- **Trend**: Her yıl panel güçleri artıyor

### 3. Sıcaklık Katsayısı
- **İyi değer**: -%0.35/°C ve altı
- **Önemi**: Türkiye'de yaz sıcaklarında verim kaybını belirler

### 4. Garanti Süreleri
- **Ürün garantisi**: 10-12 yıl (fiziksel hasar)
- **Performans garantisi**: 25-30 yıl (verim kaybı)
- **Tier 1 markalar**: Daha güvenilir garanti

## Tier 1 Panel Markaları Karşılaştırması

### JA Solar (Çin)
| Özellik | Değer |
|---------|-------|
| Verimlilik | %21.3 |
| Güç aralığı | 410-620W |
| Ürün garantisi | 12 yıl |
| Performans garantisi | 25 yıl |
| Özellik | Yarım hücre teknolojisi |

**Değerlendirme**: Fiyat/performans şampiyonu. Türkiye'de en çok tercih edilen marka.

---

### Trina Solar (Çin)
| Özellik | Değer |
|---------|-------|
| Verimlilik | %21.6 |
| Güç aralığı | 405-670W |
| Ürün garantisi | 12 yıl |
| Performans garantisi | 25 yıl |
| Özellik | Vertex teknolojisi |

**Değerlendirme**: Yüksek verimlilik, kanıtlanmış güvenilirlik.

---

### LONGi (Çin)
| Özellik | Değer |
|---------|-------|
| Verimlilik | %22.0 |
| Güç aralığı | 430-600W |
| Ürün garantisi | 12 yıl |
| Performans garantisi | 25 yıl |
| Özellik | Hi-MO teknolojisi |

**Değerlendirme**: Dünyanın en büyük panel üreticisi, en yüksek verimlilik.

---

### Canadian Solar (Kanada/Çin)
| Özellik | Değer |
|---------|-------|
| Verimlilik | %21.0 |
| Güç aralığı | 400-600W |
| Ürün garantisi | 12 yıl |
| Performans garantisi | 25 yıl |
| Özellik | TOPCon teknolojisi |

**Değerlendirme**: Batı Avrupa ve Amerika'da popüler, güçlü marka imajı.

---

### Jinko Solar (Çin)
| Özellik | Değer |
|---------|-------|
| Verimlilik | %21.8 |
| Güç aralığı | 415-625W |
| Ürün garantisi | 12 yıl |
| Performans garantisi | 30 yıl |
| Özellik | Tiger Neo serisi |

**Değerlendirme**: En uzun performans garantisi, inovatif teknolojiler.

## Genel Karşılaştırma Tablosu

| Marka | Verimlilik | Fiyat Segmenti | Türkiye'de Yaygınlık |
|-------|------------|----------------|---------------------|
| JA Solar | ⭐⭐⭐⭐ | Orta | ⭐⭐⭐⭐⭐ |
| Trina | ⭐⭐⭐⭐⭐ | Orta-Yüksek | ⭐⭐⭐⭐ |
| LONGi | ⭐⭐⭐⭐⭐ | Orta-Yüksek | ⭐⭐⭐⭐ |
| Canadian | ⭐⭐⭐⭐ | Yüksek | ⭐⭐⭐ |
| Jinko | ⭐⭐⭐⭐⭐ | Orta | ⭐⭐⭐⭐ |

## İnverter Seçimi

Panel kadar önemli olan inverter seçiminde de dikkat edilmesi gerekenler:

### String İnverterler
- **Kullanım**: Çatı sistemleri
- **Markalar**: Huawei, Fronius, SMA, Goodwe
- **Avantaj**: Güvenilir, kolay bakım

### Mikro İnverterler
- **Kullanım**: Gölgelenme olan çatılar
- **Markalar**: Enphase, Hoymiles
- **Avantaj**: Panel bazlı optimizasyon

## Kaçınılması Gereken Hatalar

❌ Sadece fiyata bakmak
❌ Garanti şartlarını okumamak
❌ Tier 2-3 markalardan ürün almak
❌ Yetkisiz satıcılardan almak
❌ Kurulum firmasını araştırmamak

## Sonuç ve Öneriler

1. **Bütçe öncelikliyse**: JA Solar veya Jinko
2. **Maksimum verimlilik**: LONGi veya Trina
3. **Marka imajı önemliyse**: Canadian Solar
4. **Uzun garanti istiyorsanız**: Jinko (30 yıl)

> **İpucu**: Panel markası kadar kurulum kalitesi de önemlidir. Deneyimli, güvenilir bir kurulum firması seçin.
        `,
    },
    'ges-maliyet-analizi': {
        title: 'GES Maliyet Analizi: Ne Kadar Yatırım Gerekiyor?',
        description: '2026 yılı güncel fiyatları, kWp başına maliyet ve yatırım geri dönüş süreleri.',
        category: 'Maliyet',
        readTime: '9 dk',
        date: '2025-12-20',
        content: `
## 2026 Güneş Enerjisi Sistemi Maliyetleri

Güneş enerjisi yatırımı planlayanlar için güncel maliyet analizi ve yatırım değerlendirmesi.

## Sistem Boyutuna Göre Maliyetler

### Konut Sistemleri (3-10 kWp)

| Sistem Boyutu | Yaklaşık Maliyet | kWp Başına |
|---------------|------------------|------------|
| 3 kWp | 75.000 - 95.000 ₺ | 25.000 - 32.000 ₺ |
| 5 kWp | 110.000 - 140.000 ₺ | 22.000 - 28.000 ₺ |
| 7 kWp | 145.000 - 185.000 ₺ | 21.000 - 26.000 ₺ |
| 10 kWp | 190.000 - 250.000 ₺ | 19.000 - 25.000 ₺ |

### Ticari Sistemler (50-500 kWp)

| Sistem Boyutu | Yaklaşık Maliyet | kWp Başına |
|---------------|------------------|------------|
| 50 kWp | 850.000 - 1.100.000 ₺ | 17.000 - 22.000 ₺ |
| 100 kWp | 1.500.000 - 2.000.000 ₺ | 15.000 - 20.000 ₺ |
| 250 kWp | 3.250.000 - 4.250.000 ₺ | 13.000 - 17.000 ₺ |
| 500 kWp | 6.000.000 - 8.000.000 ₺ | 12.000 - 16.000 ₺ |

> **Not**: Fiyatlar döviz kuruna ve piyasa koşullarına göre değişebilir.

## Maliyet Kalemleri Dağılımı

Tipik bir konut GES sisteminde maliyet dağılımı:

| Kalem | Yüzde | Açıklama |
|-------|-------|----------|
| Güneş Panelleri | %40-50 | En büyük maliyet kalemi |
| İnverter | %15-20 | 10-15 yıl ömür |
| Montaj Sistemi | %10-15 | Alüminyum/çelik konstrüksiyon |
| Kablolama | %5-8 | DC ve AC kablolar |
| İşçilik | %10-15 | Kurulum ve devreye alma |
| Proje + İzinler | %5-10 | Mühendislik ve resmi işlemler |

## Yatırım Geri Dönüş Analizi

### Örnek Senaryo: 5 kWp Konut Sistemi

**Varsayımlar:**
- Sistem maliyeti: 125.000 ₺
- Yıllık üretim: 7.500 kWh
- Elektrik fiyatı: 4.5 ₺/kWh
- Yıllık elektrik zammı: %25

**Hesaplama:**

| Yıl | Yıllık Tasarruf | Kümülatif Tasarruf |
|-----|-----------------|-------------------|
| 1 | 33.750 ₺ | 33.750 ₺ |
| 2 | 42.188 ₺ | 75.938 ₺ |
| 3 | 52.734 ₺ | 128.672 ₺ ✅ |
| 4 | 65.918 ₺ | 194.590 ₺ |
| 5 | 82.397 ₺ | 276.987 ₺ |

**Geri ödeme süresi: ~3 yıl**

### 25 Yıllık Toplam Getiri

- **Toplam enerji üretimi**: ~175.000 kWh
- **Toplam tasarruf**: 15-25 milyon ₺ (elektrik zamlarına bağlı)
- **Yatırım getirisi (ROI)**: %1.000+

## Fiyatları Etkileyen Faktörler

### Fiyatı Artıran Faktörler
- Zor çatı koşulları (yükseklik, eğim)
- Gölgelenme optimizasyonu
- Premium marka tercihi
- Uzak konum (nakliye maliyeti)
- Ek izin gereksinimleri

### Fiyatı Düşüren Faktörler
- Büyük sistem boyutu (ölçek ekonomisi)
- Kolay kurulum koşulları
- Toplu alımlar
- Kampanyalı dönemler
- Yerli ekipman kullanımı

## Finansman Seçenekleri

### 1. Peşin Ödeme
- **Avantaj**: En düşük toplam maliyet
- **Dezavantaj**: Yüksek başlangıç sermayesi

### 2. Banka Kredisi
- **Vade**: 12-120 ay
- **Faiz**: Değişken (piyasa koşullarına göre)
- **Avantaj**: Yatırımı hemen yapabilme

### 3. Taksitli Satış
- **Vade**: 12-36 ay
- **Avantaj**: Firma ile direkt anlaşma
- **Dezavantaj**: Genelde daha yüksek faiz

### 4. Leasing
- **Süre**: 5-7 yıl
- **Avantaj**: Bilanço dışı finansman
- **Kullanım**: Ticari sistemler için uygun

## Dikkat Edilmesi Gerekenler

### Gizli Maliyetler
- Şebeke bağlantı bedeli
- İmar izni masrafları
- Proje onay ücretleri
- Yıllık bakım maliyetleri

### Teklif Karşılaştırması
- En az 3 firmadan teklif alın
- Aynı marka/model için karşılaştırın
- Kurulum dahil/hariç netleştirin
- Garanti kapsamını sorgulayın

## Sonuç

Güneş enerjisi yatırımı, 2026 yılında daha önce hiç olmadığı kadar mantıklı. Elektrik fiyatlarındaki artış ve sistem maliyetlerindeki düşüş, geri ödeme sürelerini kısaltmaktadır.

**Tavsiye**: Birden fazla firmadan teklif alın, referansları kontrol edin ve sadece "en ucuz" yerine "en değerli" teklifi seçin.
        `,
    },
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = blogContent[slug]

    if (!post) {
        return { title: 'Yazı Bulunamadı' }
    }

    return {
        title: `${post.title} | GüneşKolay Blog`,
        description: post.description,
    }
}

export function generateStaticParams() {
    return Object.keys(blogContent).map((slug) => ({ slug }))
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = blogContent[slug]

    if (!post) {
        notFound()
    }

    // Simple markdown to HTML conversion
    const contentHtml = post.content
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-8 mb-3">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
        .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal">$2</li>')
        .replace(/✅/g, '<span class="text-green-500">✅</span>')
        .replace(/❌/g, '<span class="text-red-500">❌</span>')
        .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>')
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(c => c.trim())
            if (cells.every(c => c.includes('---'))) return ''
            const cellHtml = cells.map(c => `<td class="border px-3 py-2">${c.trim()}</td>`).join('')
            return `<tr>${cellHtml}</tr>`
        })
        .replace(/---+/g, '')

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
            <article className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Back link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Blog&apos;a Dön
                        </Link>

                        {/* Header */}
                        <header className="mb-10">
                            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                {post.title}
                            </h1>
                            <p className="text-lg text-muted-foreground mb-6">
                                {post.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {post.readTime} okuma
                                </span>
                            </div>
                        </header>

                        {/* Content */}
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${contentHtml}</p>` }}
                        />

                        {/* CTA */}
                        <Card className="mt-12 gradient-primary text-white overflow-hidden">
                            <CardContent className="p-6 md:p-8 text-center relative">
                                <Sun className="h-10 w-10 mx-auto mb-4 opacity-80" />
                                <h3 className="text-xl font-bold mb-2">
                                    Güneş Enerjisine Geçmeye Hazır mısınız?
                                </h3>
                                <p className="opacity-90 mb-4">
                                    Ücretsiz teklif alın, ne kadar tasarruf edeceğinizi öğrenin.
                                </p>
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/teklif-al">
                                        Ücretsiz Teklif Al
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </article>
        </div>
    )
}
