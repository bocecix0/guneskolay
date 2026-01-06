'use client'

import { useEffect, useRef, useState } from 'react'
import { Building2, MapPin, Users, Zap, Sun, CheckCircle } from 'lucide-react'

interface CounterItemProps {
    end: number
    suffix?: string
    prefix?: string
    label: string
    icon: React.ReactNode
    duration?: number
}

function CounterItem({ end, suffix = '', prefix = '', label, icon, duration = 2000 }: CounterItemProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [isVisible, end, duration])

    return (
        <div
            ref={ref}
            className="group relative text-center p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="relative mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {icon}
            </div>

            {/* Counter */}
            <div className="relative">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tabular-nums">
                    {prefix}{count.toLocaleString('tr-TR')}{suffix}
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{label}</p>
            </div>
        </div>
    )
}

export function AnimatedCounter() {
    const stats = [
        {
            end: 50,
            suffix: '+',
            label: 'Doğrulanmış Firma',
            icon: <Building2 className="h-6 w-6" />,
        },
        {
            end: 81,
            label: 'İl Kapsama',
            icon: <MapPin className="h-6 w-6" />,
        },
        {
            end: 500,
            suffix: '+',
            label: 'Mutlu Müşteri',
            icon: <Users className="h-6 w-6" />,
        },
        {
            end: 2500,
            suffix: '+',
            label: 'kWp Kurulum',
            icon: <Zap className="h-6 w-6" />,
        },
        {
            end: 1200,
            suffix: '+',
            label: 'Tamamlanan Proje',
            icon: <Sun className="h-6 w-6" />,
        },
        {
            end: 100,
            prefix: '%',
            label: 'Ücretsiz Hizmet',
            icon: <CheckCircle className="h-6 w-6" />,
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Rakamlarla Biz
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Güvenilir Bir Platform
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                        Türkiye&apos;nin her yerinde güneş enerjisi çözümleri sunuyoruz
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <CounterItem
                            key={index}
                            end={stat.end}
                            suffix={stat.suffix}
                            prefix={stat.prefix}
                            label={stat.label}
                            icon={stat.icon}
                            duration={2000 + index * 200}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
