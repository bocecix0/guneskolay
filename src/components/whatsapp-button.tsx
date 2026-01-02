'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905551234567'
    const message = encodeURIComponent('Merhaba, GüneşKolay üzerinden ulaşıyorum. Güneş enerjisi hakkında bilgi almak istiyorum.')

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            aria-label="WhatsApp ile iletişime geç"
        >
            <MessageCircle className="h-7 w-7" fill="currentColor" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </a>
    )
}

type WhatsAppLinkProps = {
    leadId?: string
    source?: string
    children: React.ReactNode
    className?: string
}

export function WhatsAppLink({ leadId, source, children, className }: WhatsAppLinkProps) {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905551234567'

    let message = 'Merhaba, GüneşKolay üzerinden ulaşıyorum.'
    if (leadId) {
        message += ` Başvuru numaramı: ${leadId}`
    }
    if (source) {
        message += ` (${source})`
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {children}
        </a>
    )
}
