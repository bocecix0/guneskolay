import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Gizlilik Politikası',
    description: 'GüneşKolay Gizlilik Politikası - Verilerinizin nasıl korunduğu hakkında bilgilendirme.',
}

export default function GizlilikPage() {
    return (
        <div className="min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto prose prose-slate">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                        <p className="text-sm text-yellow-800 m-0">
                            ⚠️ <strong>TASLAK</strong>: Bu metin örnek amaçlıdır ve hukuki danışmanlık yerine geçmez.
                            Yayınlamadan önce bir avukata danışın.
                        </p>
                    </div>

                    <h1>Gizlilik Politikası</h1>

                    <p>
                        <strong>Son Güncelleme:</strong> Ocak 2026
                    </p>

                    <h2>Giriş</h2>
                    <p>
                        GüneşKolay olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi
                        korumayı taahhüt ediyoruz. Bu gizlilik politikası, web sitemizi
                        kullandığınızda hangi bilgileri topladığımızı ve bunları nasıl
                        kullandığımızı açıklamaktadır.
                    </p>

                    <h2>Topladığımız Bilgiler</h2>
                    <h3>Doğrudan Sağladığınız Bilgiler</h3>
                    <ul>
                        <li>Teklif formu doldururken sağladığınız kişisel bilgiler (ad, telefon, konum)</li>
                        <li>Firma başvurusu sırasında sağladığınız şirket bilgileri</li>
                        <li>Bizimle iletişime geçtiğinizde paylaştığınız bilgiler</li>
                    </ul>

                    <h3>Otomatik Olarak Toplanan Bilgiler</h3>
                    <ul>
                        <li>IP adresi ve tarayıcı bilgileri</li>
                        <li>Çerezler aracılığıyla toplanan kullanım verileri</li>
                        <li>Sayfa görüntüleme ve etkileşim verileri</li>
                    </ul>

                    <h2>Bilgilerin Kullanımı</h2>
                    <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanıyoruz:</p>
                    <ul>
                        <li>Güneş enerjisi kurulum teklifleri sağlamak</li>
                        <li>Sizi uygun firmalarla eşleştirmek</li>
                        <li>Hizmet kalitemizi iyileştirmek</li>
                        <li>Size dönüş yapmak ve destek sağlamak</li>
                        <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                    </ul>

                    <h2>Bilgi Paylaşımı</h2>
                    <p>
                        Kişisel bilgilerinizi yalnızca aşağıdaki durumlarda üçüncü taraflarla
                        paylaşırız:
                    </p>
                    <ul>
                        <li>Teklif almak istediğiniz doğrulanmış kurulum firmaları ile</li>
                        <li>Yasal zorunluluk halinde yetkili makamlar ile</li>
                        <li>Açık rızanızın olduğu diğer durumlarda</li>
                    </ul>

                    <h2>Veri Güvenliği</h2>
                    <p>
                        Verilerinizi korumak için endüstri standardı güvenlik önlemleri
                        kullanıyoruz. Ancak internet üzerinden hiçbir veri iletiminin
                        %100 güvenli olmadığını hatırlatırız.
                    </p>

                    <h2>Veri Saklama</h2>
                    <p>
                        Kişisel verilerinizi, hizmet sunmak için gerekli olduğu sürece
                        veya yasal yükümlülüklerimizi yerine getirmek için gereken süre
                        boyunca saklarız.
                    </p>

                    <h2>Haklarınız</h2>
                    <p>
                        KVKK kapsamında verilerinize erişme, düzeltme, silme ve işlemeye
                        itiraz etme haklarına sahipsiniz. Bu haklarınızı kullanmak için
                        bizimle iletişime geçebilirsiniz.
                    </p>

                    <h2>Politika Değişiklikleri</h2>
                    <p>
                        Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli
                        değişiklikler olduğunda sizi bilgilendireceğiz.
                    </p>

                    <h2>İletişim</h2>
                    <p>
                        Gizlilik politikamız hakkında sorularınız için:
                    </p>
                    <ul>
                        <li>E-posta: gizlilik@guneskolay.com</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
