'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sun, Zap, MapPin } from 'lucide-react'

// Turkey regions with solar data
const regions: Record<string, {
    name: string
    sunHours: number
    radiation: number
    potential: 'Çok Yüksek' | 'Yüksek' | 'Orta' | 'Düşük'
    cities: string[]
}> = {
    'marmara': {
        name: 'Marmara',
        sunHours: 4.5,
        radiation: 1400,
        potential: 'Orta',
        cities: ['İstanbul', 'Bursa', 'Kocaeli', 'Balıkesir'],
    },
    'ege': {
        name: 'Ege',
        sunHours: 5.5,
        radiation: 1650,
        potential: 'Yüksek',
        cities: ['İzmir', 'Aydın', 'Denizli', 'Muğla'],
    },
    'akdeniz': {
        name: 'Akdeniz',
        sunHours: 6.0,
        radiation: 1800,
        potential: 'Çok Yüksek',
        cities: ['Antalya', 'Mersin', 'Adana', 'Hatay'],
    },
    'ic-anadolu': {
        name: 'İç Anadolu',
        sunHours: 5.0,
        radiation: 1550,
        potential: 'Yüksek',
        cities: ['Ankara', 'Konya', 'Kayseri', 'Eskişehir'],
    },
    'karadeniz': {
        name: 'Karadeniz',
        sunHours: 3.5,
        radiation: 1200,
        potential: 'Düşük',
        cities: ['Samsun', 'Trabzon', 'Zonguldak', 'Ordu'],
    },
    'dogu-anadolu': {
        name: 'Doğu Anadolu',
        sunHours: 4.8,
        radiation: 1500,
        potential: 'Yüksek',
        cities: ['Van', 'Erzurum', 'Malatya', 'Elazığ'],
    },
    'guneydogu': {
        name: 'Güneydoğu Anadolu',
        sunHours: 5.8,
        radiation: 1750,
        potential: 'Çok Yüksek',
        cities: ['Diyarbakır', 'Gaziantep', 'Şanlıurfa', 'Mardin'],
    },
}

function getPotentialColor(potential: string) {
    switch (potential) {
        case 'Çok Yüksek': return 'bg-orange-500'
        case 'Yüksek': return 'bg-yellow-500'
        case 'Orta': return 'bg-green-500'
        case 'Düşük': return 'bg-blue-500'
        default: return 'bg-gray-500'
    }
}

function getRegionFill(potential: string, isHovered: boolean) {
    const opacity = isHovered ? '1' : '0.7'
    switch (potential) {
        case 'Çok Yüksek': return `rgba(249, 115, 22, ${opacity})`
        case 'Yüksek': return `rgba(234, 179, 8, ${opacity})`
        case 'Orta': return `rgba(34, 197, 94, ${opacity})`
        case 'Düşük': return `rgba(59, 130, 246, ${opacity})`
        default: return `rgba(156, 163, 175, ${opacity})`
    }
}

export function TurkeySolarMap() {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
    const [selectedRegion, setSelectedRegion] = useState<string | null>('akdeniz')

    const activeRegion = hoveredRegion || selectedRegion
    const regionData = activeRegion ? regions[activeRegion] : null

    return (
        <div className="space-y-6">
            {/* Map Container */}
            <div className="relative">
                <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto"
                >
                    {/* Simplified Turkey Map - Regions as clickable areas */}

                    {/* Marmara */}
                    <path
                        d="M150,80 L220,70 L250,100 L230,140 L180,150 L130,130 L120,100 Z"
                        fill={getRegionFill(regions.marmara.potential, hoveredRegion === 'marmara')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('marmara')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('marmara')}
                    />

                    {/* Ege */}
                    <path
                        d="M80,150 L130,130 L180,150 L170,220 L140,280 L80,260 L60,200 Z"
                        fill={getRegionFill(regions.ege.potential, hoveredRegion === 'ege')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('ege')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('ege')}
                    />

                    {/* Akdeniz */}
                    <path
                        d="M140,280 L170,220 L230,240 L320,260 L400,280 L500,300 L450,350 L300,360 L180,340 Z"
                        fill={getRegionFill(regions.akdeniz.potential, hoveredRegion === 'akdeniz')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('akdeniz')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('akdeniz')}
                    />

                    {/* İç Anadolu */}
                    <path
                        d="M230,140 L250,100 L350,90 L450,100 L480,150 L470,220 L400,250 L320,260 L230,240 L170,220 L180,150 Z"
                        fill={getRegionFill(regions['ic-anadolu'].potential, hoveredRegion === 'ic-anadolu')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('ic-anadolu')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('ic-anadolu')}
                    />

                    {/* Karadeniz */}
                    <path
                        d="M220,70 L350,50 L500,40 L650,50 L680,80 L650,110 L550,100 L450,100 L350,90 L250,100 Z"
                        fill={getRegionFill(regions.karadeniz.potential, hoveredRegion === 'karadeniz')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('karadeniz')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('karadeniz')}
                    />

                    {/* Doğu Anadolu */}
                    <path
                        d="M550,100 L650,110 L750,130 L780,180 L750,250 L680,280 L600,270 L520,240 L480,150 L450,100 Z"
                        fill={getRegionFill(regions['dogu-anadolu'].potential, hoveredRegion === 'dogu-anadolu')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('dogu-anadolu')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('dogu-anadolu')}
                    />

                    {/* Güneydoğu Anadolu */}
                    <path
                        d="M480,250 L520,240 L600,270 L680,280 L700,320 L650,360 L550,350 L500,300 L400,280 L470,220 Z"
                        fill={getRegionFill(regions.guneydogu.potential, hoveredRegion === 'guneydogu')}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRegion('guneydogu')}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion('guneydogu')}
                    />
                </svg>

                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur rounded-lg p-3 text-xs space-y-1">
                    <div className="font-semibold mb-2">Güneşlenme Potansiyeli</div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-orange-500" />
                        <span>Çok Yüksek</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-yellow-500" />
                        <span>Yüksek</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span>Orta</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-500" />
                        <span>Düşük</span>
                    </div>
                </div>
            </div>

            {/* Region Info Card */}
            {regionData && (
                <Card className="animate-fade-in">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${getPotentialColor(regionData.potential)} flex items-center justify-center`}>
                                    <Sun className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{regionData.name} Bölgesi</h3>
                                    <Badge variant="secondary">{regionData.potential} Potansiyel</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{regionData.sunHours}</div>
                                <div className="text-xs text-muted-foreground">Saat/Gün</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{regionData.radiation}</div>
                                <div className="text-xs text-muted-foreground">kWh/m²/yıl</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{Math.round(regionData.sunHours * 365)}</div>
                                <div className="text-xs text-muted-foreground">Saat/Yıl</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{Math.round(regionData.radiation * 0.85 / 1000 * 100) / 100}</div>
                                <div className="text-xs text-muted-foreground">MWh/kWp/yıl</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Başlıca iller:</span>
                            {regionData.cities.map((city) => (
                                <Badge key={city} variant="outline" className="text-xs">{city}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
