import Link from 'next/link'
import { Sun } from 'lucide-react'

const footerLinks = {
    hizmetler: [
        { href: '/teklif-al', label: 'Teklif Al' },
        { href: '/firmalar', label: 'Firma Bul' },
        { href: '/firma-katil', label: 'Firma Başvurusu' },
    ],
    yasal: [
        { href: '/kvkk', label: 'KVKK Aydınlatma' },
        { href: '/gizlilik', label: 'Gizlilik Politikası' },
        { href: '/cerez-politikasi', label: 'Çerez Politikası' },
    ],
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                                <Sun className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">
                                Güneş<span className="text-primary">Kolay</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Güneş enerjisi yatırımında doğru firmayı bulmak artık kolay.
                            Doğrulanmış firmalar, şeffaf teklifler, güvenli süreç.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4">
                            📞 Destek için WhatsApp ile ulaşın
                        </p>
                    </div>

                    {/* Hizmetler */}
                    <div>
                        <h3 className="font-semibold mb-4">Hizmetler</h3>
                        <ul className="space-y-2">
                            {footerLinks.hizmetler.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Yasal */}
                    <div>
                        <h3 className="font-semibold mb-4">Yasal</h3>
                        <ul className="space-y-2">
                            {footerLinks.yasal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} GüneşKolay. Tüm hakları saklıdır.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Türkiye&apos;nin güneş enerjisi pazaryeri
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
