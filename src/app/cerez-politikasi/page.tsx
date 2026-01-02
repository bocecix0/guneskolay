import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Çerez Politikası',
    description: 'GüneşKolay Çerez Politikası - Web sitemizdeki çerez kullanımı hakkında bilgilendirme.',
}

export default function CerezPolitikasiPage() {
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

                    <h1>Çerez Politikası</h1>

                    <p>
                        <strong>Son Güncelleme:</strong> Ocak 2026
                    </p>

                    <h2>Çerez Nedir?</h2>
                    <p>
                        Çerezler, web sitelerinin bilgisayarınıza veya mobil cihazınıza
                        yerleştirdiği küçük metin dosyalarıdır. Çerezler, web sitesinin
                        sizi tanımasını ve tercihlerinizi hatırlamasını sağlar.
                    </p>

                    <h2>Çerez Türleri</h2>

                    <h3>Zorunlu Çerezler</h3>
                    <p>
                        Bu çerezler web sitesinin düzgün çalışması için gereklidir.
                        Bunlar olmadan bazı sayfalara erişemez veya form dolduramayabilirsiniz.
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Çerez Adı</th>
                                <th>Amacı</th>
                                <th>Süresi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>sb-*-auth-token</td>
                                <td>Kullanıcı oturumu</td>
                                <td>1 hafta</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Analitik Çerezler</h3>
                    <p>
                        Bu çerezler, ziyaretçilerin web sitemizi nasıl kullandığını
                        anlamamıza yardımcı olur. Toplanan veriler anonimleştirilmiştir.
                    </p>

                    <h3>Fonksiyonel Çerezler</h3>
                    <p>
                        Bu çerezler, tercihlerinizi hatırlamamızı sağlar (örneğin dil tercihi).
                    </p>

                    <h2>Çerez Yönetimi</h2>
                    <p>
                        Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz.
                        Ancak bazı çerezleri devre dışı bırakmak web sitesinin işlevselliğini
                        etkileyebilir.
                    </p>

                    <h3>Tarayıcılarda Çerez Ayarları</h3>
                    <ul>
                        <li>
                            <strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler
                        </li>
                        <li>
                            <strong>Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik → Çerezler
                        </li>
                        <li>
                            <strong>Safari:</strong> Tercihler → Gizlilik → Çerezler
                        </li>
                        <li>
                            <strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri
                        </li>
                    </ul>

                    <h2>Üçüncü Taraf Çerezleri</h2>
                    <p>
                        Web sitemiz, hizmet kalitesini artırmak için üçüncü taraf
                        hizmetler kullanabilir. Bu hizmetler kendi çerezlerini yerleştirebilir:
                    </p>
                    <ul>
                        <li>Analitik hizmetleri</li>
                        <li>Sosyal medya entegrasyonları</li>
                    </ul>

                    <h2>Politika Güncellemeleri</h2>
                    <p>
                        Bu çerez politikasını zaman zaman güncelleyebiliriz. Değişiklikler
                        bu sayfada yayınlanacaktır.
                    </p>

                    <h2>İletişim</h2>
                    <p>
                        Çerez politikamız hakkında sorularınız için:
                    </p>
                    <ul>
                        <li>E-posta: cerez@guneskolay.com</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
