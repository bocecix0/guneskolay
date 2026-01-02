'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu, Sun, MessageCircle } from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/firmalar', label: 'Firmalar' },
    { href: '/teklif-al', label: 'Teklif Al' },
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905551234567'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Merhaba, GüneşKolay üzerinden ulaşıyorum.')}`

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg gradient-primary">
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-foreground">
                        Güneş<span className="text-primary">Kolay</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/firma-katil">Firma Olarak Katıl</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/teklif-al">Ücretsiz Teklif Al</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menüyü aç</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
                        {/* Hidden title for accessibility */}
                        <VisuallyHidden.Root>
                            <SheetTitle>Navigasyon Menüsü</SheetTitle>
                        </VisuallyHidden.Root>

                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center gap-2 p-4 border-b">
                                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                                        <Sun className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-lg font-bold">
                                        Güneş<span className="text-primary">Kolay</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Navigation */}
                            <nav className="flex flex-col p-4 gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded-lg px-3 py-2.5"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* CTAs */}
                            <div className="flex flex-col gap-3 p-4 border-t mt-auto">
                                <Button variant="outline" asChild className="w-full h-11">
                                    <Link href="/firma-katil" onClick={() => setIsOpen(false)}>
                                        Firma Olarak Katıl
                                    </Link>
                                </Button>
                                <Button asChild className="w-full h-11">
                                    <Link href="/teklif-al" onClick={() => setIsOpen(false)}>
                                        Ücretsiz Teklif Al
                                    </Link>
                                </Button>

                                {/* WhatsApp */}
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <MessageCircle className="h-5 w-5" fill="currentColor" />
                                    WhatsApp ile İletişim
                                </a>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
