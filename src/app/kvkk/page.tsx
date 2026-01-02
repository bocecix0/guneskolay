import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'KVKK Aydınlatma Metni',
    description: 'GüneşKolay KVKK Aydınlatma Metni - Kişisel verilerin korunması hakkında bilgilendirme.',
}

export default function KVKKPage() {
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

                    <h1>KVKK Aydınlatma Metni</h1>

                    <p>
                        <strong>Son Güncelleme:</strong> Ocak 2026
                    </p>

                    <h2>1. Veri Sorumlusu</h2>
                    <p>
                        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
                        kişisel verileriniz veri sorumlusu sıfatıyla GüneşKolay tarafından
                        aşağıda açıklanan kapsamda işlenebilecektir.
                    </p>

                    <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
                    <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenebilecektir:</p>
                    <ul>
                        <li>Güneş enerjisi kurulum hizmeti teklif sürecinin yürütülmesi</li>
                        <li>Hizmet kalitesinin artırılması ve müşteri memnuniyetinin sağlanması</li>
                        <li>İletişim faaliyetlerinin yürütülmesi</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                        <li>Şirket faaliyetlerinin yürütülmesi</li>
                    </ul>

                    <h2>3. İşlenen Kişisel Veri Kategorileri</h2>
                    <ul>
                        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                        <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi</li>
                        <li><strong>Lokasyon Bilgileri:</strong> İl, ilçe</li>
                        <li><strong>Mülk Bilgileri:</strong> Mülk tipi, çatı durumu</li>
                        <li><strong>Finans Bilgileri:</strong> Elektrik faturası aralığı, bütçe tercihi</li>
                    </ul>

                    <h2>4. Kişisel Verilerin Aktarılması</h2>
                    <p>
                        Kişisel verileriniz, hizmet sunumu amacıyla platformumuza kayıtlı
                        doğrulanmış güneş enerjisi kurulum firmalarıyla paylaşılabilir.
                        Bu aktarım, yalnızca teklif sürecinin yürütülmesi amacıyla sınırlıdır.
                    </p>

                    <h2>5. Kişisel Veri Toplama Yöntemi ve Hukuki Sebebi</h2>
                    <p>
                        Kişisel verileriniz, web sitemiz üzerindeki formlar aracılığıyla
                        elektronik ortamda toplanmaktadır. Verilerin işlenmesinin hukuki
                        sebebi, açık rızanız ve sözleşmenin kurulması için gerekli olmasıdır.
                    </p>

                    <h2>6. Haklarınız</h2>
                    <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                    <ul>
                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                        <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                        <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                        <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                        <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                        <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                        <li>Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesine ilişkin işlemlerin bildirilmesini isteme</li>
                        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                        <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
                    </ul>

                    <h2>7. İletişim</h2>
                    <p>
                        Haklarınızı kullanmak için veya sorularınız için aşağıdaki kanallardan
                        bize ulaşabilirsiniz:
                    </p>
                    <ul>
                        <li>E-posta: kvkk@guneskolay.com</li>
                        <li>Adres: [Şirket Adresi]</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
