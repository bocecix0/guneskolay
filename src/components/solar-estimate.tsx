'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    calculateSolarEstimate,
    formatRange,
    formatCurrencyRange,
    formatCurrency,
} from '@/lib/solar-calculator'
import { Sun, Zap, PiggyBank, Leaf, AlertTriangle, Info } from 'lucide-react'

type PropertyType = 'mustakil' | 'site' | 'isyeri'
type RoofType = 'duz' | 'egimli' | 'bilmiyorum'

interface SolarEstimateDisplayProps {
    city: string
    district?: string
    property_type: PropertyType
    bill_range: string
    roof_type: RoofType
}

export function SolarEstimateDisplay(props: SolarEstimateDisplayProps) {
    const estimate = calculateSolarEstimate(props)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                    <Sun className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ön Güneş Enerjisi Analizi</h2>
                <p className="text-muted-foreground mt-1">
                    {props.city}{props.district ? `, ${props.district}` : ''} için tahmini değerler
                </p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* System Size */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Sistem Gücü
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-primary">
                            {formatRange(estimate.systemSize, ' kWp')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {formatRange(estimate.panelCount)} adet panel
                        </p>
                    </CardContent>
                </Card>

                {/* Cost */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <PiggyBank className="h-4 w-4" />
                            Tahmini Maliyet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold">
                            {formatCurrencyRange(estimate.costRange)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Kurulum dahil
                        </p>
                    </CardContent>
                </Card>

                {/* Monthly Savings */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Aylık Tasarruf
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrencyRange(estimate.monthlySavings)}
                        </p>
                    </CardContent>
                </Card>

                {/* Annual Savings */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <PiggyBank className="h-4 w-4" />
                            Yıllık Tasarruf
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrencyRange(estimate.annualSavings)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/50">
                    <CardContent className="pt-4 text-center">
                        <p className="text-sm text-muted-foreground">Geri Ödeme Süresi</p>
                        <p className="text-xl font-semibold mt-1">
                            {formatRange(estimate.paybackYears, ' yıl')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-muted/50">
                    <CardContent className="pt-4 text-center">
                        <p className="text-sm text-muted-foreground">Kullanılabilir Alan</p>
                        <p className="text-xl font-semibold mt-1">
                            {formatRange(estimate.usableArea, ' m²')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-700">
                            <Leaf className="h-4 w-4" />
                            <p className="text-sm">Yıllık CO₂ Tasarrufu</p>
                        </div>
                        <p className="text-xl font-semibold mt-1 text-green-700">
                            {estimate.co2Saved.toLocaleString('tr-TR')} kg
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            {/* Important Notes */}
            <Card className="border-yellow-200 bg-yellow-50/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-yellow-800">
                        <AlertTriangle className="h-4 w-4" />
                        Önemli Bilgiler
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-yellow-900 space-y-2">
                    <p>
                        • Bu değerler <strong>tahmini</strong> olup kesin teklif niteliği taşımamaktadır.
                    </p>
                    <p>
                        • Gerçek maliyet ve tasarruf, yerinde keşif sonrası belirlenecektir.
                    </p>
                    <p>
                        • Çatı yönü, eğimi ve gölgelenme durumu üretimi etkileyebilir.
                    </p>
                    <p>
                        • Fiyatlar piyasa koşullarına göre değişkenlik gösterebilir.
                    </p>
                </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                    Hesaplamalar Türkiye güneşlenme ortalamaları ve güncel piyasa verileri
                    kullanılarak yapılmıştır. Kesin değerler için profesyonel keşif gereklidir.
                </p>
            </div>
        </div>
    )
}
