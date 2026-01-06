'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROIChart } from '@/components/roi-chart'
import Link from 'next/link'
import {
    Calculator,
    Zap,
    TrendingUp,
    Leaf,
    Clock,
    ArrowRight,
    Sun,
    Banknote,
    TreeDeciduous
} from 'lucide-react'

// Türkiye ortalamaları ve hesaplama sabitleri
const CONSTANTS = {
    electricityPricePerKwh: 4.5, // TL/kWh (2026 tahmini ortalama)
    avgSunHoursPerDay: 5.5, // Türkiye ortalaması
    systemEfficiency: 0.85, // %85 verimlilik
    panelWatt: 550, // Watt per panel
    costPerKwp: 25000, // TL per kWp kurulum maliyeti
    co2PerKwh: 0.5, // kg CO2 per kWh
    systemLifeYears: 25,
    degradationPerYear: 0.005, // %0.5 yıllık verim kaybı
    electricityInflation: 0.25, // %25 yıllık elektrik zammı tahmini
}

interface CalculationResult {
    monthlyConsumption: number
    yearlyConsumption: number
    recommendedSystemKwp: number
    panelCount: number
    estimatedCost: { min: number; max: number }
    yearlyProduction: number
    yearlySavings: number
    paybackYears: number
    savings25Year: number
    co2Saved: number
    treesEquivalent: number
}

function calculateSolar(monthlyBill: number): CalculationResult {
    // Aylık faturadan tüketim hesapla
    const monthlyConsumption = monthlyBill / CONSTANTS.electricityPricePerKwh
    const yearlyConsumption = monthlyConsumption * 12

    // Sistem boyutu hesapla
    const dailyConsumption = yearlyConsumption / 365
    const requiredDailyProduction = dailyConsumption / CONSTANTS.systemEfficiency
    const recommendedSystemKwp = requiredDailyProduction / CONSTANTS.avgSunHoursPerDay
    const roundedKwp = Math.ceil(recommendedSystemKwp * 2) / 2 // 0.5 kWp'ye yuvarla

    // Panel sayısı
    const panelCount = Math.ceil((roundedKwp * 1000) / CONSTANTS.panelWatt)

    // Maliyet tahmini (%15 marj)
    const baseCost = roundedKwp * CONSTANTS.costPerKwp
    const estimatedCost = {
        min: Math.round(baseCost * 0.85),
        max: Math.round(baseCost * 1.15),
    }

    // Yıllık üretim
    const yearlyProduction = roundedKwp * CONSTANTS.avgSunHoursPerDay * 365 * CONSTANTS.systemEfficiency

    // Yıllık tasarruf
    const yearlySavings = yearlyProduction * CONSTANTS.electricityPricePerKwh

    // Geri ödeme süresi
    const paybackYears = baseCost / yearlySavings

    // 25 yıllık toplam tasarruf (elektrik zamları dahil)
    let totalSavings = 0
    let currentPrice = CONSTANTS.electricityPricePerKwh
    let currentProduction = yearlyProduction

    for (let year = 1; year <= CONSTANTS.systemLifeYears; year++) {
        totalSavings += currentProduction * currentPrice
        currentPrice *= (1 + CONSTANTS.electricityInflation)
        currentProduction *= (1 - CONSTANTS.degradationPerYear)
    }

    // CO2 tasarrufu
    const co2Saved = yearlyProduction * CONSTANTS.co2PerKwh * CONSTANTS.systemLifeYears
    const treesEquivalent = Math.round(co2Saved / 22) // Her ağaç yılda ~22kg CO2 emer

    return {
        monthlyConsumption: Math.round(monthlyConsumption),
        yearlyConsumption: Math.round(yearlyConsumption),
        recommendedSystemKwp: roundedKwp,
        panelCount,
        estimatedCost,
        yearlyProduction: Math.round(yearlyProduction),
        yearlySavings: Math.round(yearlySavings),
        paybackYears: Math.round(paybackYears * 10) / 10,
        savings25Year: Math.round(totalSavings),
        co2Saved: Math.round(co2Saved),
        treesEquivalent,
    }
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        maximumFractionDigits: 0,
    }).format(value)
}

function formatNumber(value: number): string {
    return new Intl.NumberFormat('tr-TR').format(value)
}

function ResultCard({
    icon,
    label,
    value,
    subtext,
    highlight = false
}: {
    icon: React.ReactNode
    label: string
    value: string
    subtext?: string
    highlight?: boolean
}) {
    return (
        <div className={`p-5 rounded-xl border ${highlight ? 'bg-primary/5 border-primary/30' : 'bg-muted/30 border-border/50'} transition-all hover:shadow-md`}>
            <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${highlight ? 'bg-primary text-white' : 'bg-muted text-primary'}`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className={`text-xl font-bold mt-0.5 ${highlight ? 'text-primary' : ''}`}>{value}</p>
                    {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
                </div>
            </div>
        </div>
    )
}

export default function CalculatorPage() {
    const [monthlyBill, setMonthlyBill] = useState<string>('')
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [isCalculating, setIsCalculating] = useState(false)

    const handleCalculate = () => {
        const bill = parseFloat(monthlyBill)
        if (isNaN(bill) || bill <= 0) return

        setIsCalculating(true)

        // Animasyon için küçük gecikme
        setTimeout(() => {
            setResult(calculateSolar(bill))
            setIsCalculating(false)
        }, 500)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                            <Calculator className="h-4 w-4" />
                            <span className="text-sm font-medium">Tasarruf Hesaplayıcı</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Güneş Enerjisiyle Ne Kadar{' '}
                            <span className="text-primary">Tasarruf</span> Edersin?
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                            Aylık elektrik faturanı gir, sana özel sistem boyutu ve tasarruf hesabını hemen gör.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Input Card */}
                        <Card className="mb-8 overflow-hidden">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row gap-4 items-end">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="bill" className="text-base font-medium">
                                            Aylık Elektrik Faturanız (TL)
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₺</span>
                                            <Input
                                                id="bill"
                                                type="number"
                                                placeholder="Örn: 2500"
                                                value={monthlyBill}
                                                onChange={(e) => setMonthlyBill(e.target.value)}
                                                className="pl-10 h-14 text-xl"
                                                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 text-lg"
                                        onClick={handleCalculate}
                                        disabled={!monthlyBill || isCalculating}
                                    >
                                        {isCalculating ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Hesaplanıyor
                                            </div>
                                        ) : (
                                            <>
                                                Hesapla
                                                <Zap className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        {result && (
                            <div className="space-y-6 animate-fade-in">
                                {/* System Info */}
                                <Card>
                                    <CardContent className="p-6 md:p-8">
                                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                            <Sun className="h-5 w-5 text-primary" />
                                            Önerilen Sistem
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <ResultCard
                                                icon={<Zap className="h-5 w-5" />}
                                                label="Sistem Kapasitesi"
                                                value={`${result.recommendedSystemKwp} kWp`}
                                                subtext={`${result.panelCount} adet panel`}
                                            />
                                            <ResultCard
                                                icon={<Banknote className="h-5 w-5" />}
                                                label="Tahmini Maliyet"
                                                value={`${formatCurrency(result.estimatedCost.min)} - ${formatCurrency(result.estimatedCost.max)}`}
                                                subtext="Kurulum dahil"
                                            />
                                            <ResultCard
                                                icon={<Sun className="h-5 w-5" />}
                                                label="Yıllık Üretim"
                                                value={`${formatNumber(result.yearlyProduction)} kWh`}
                                                subtext={`Tüketiminiz: ${formatNumber(result.yearlyConsumption)} kWh`}
                                            />
                                            <ResultCard
                                                icon={<Clock className="h-5 w-5" />}
                                                label="Geri Ödeme Süresi"
                                                value={`${result.paybackYears} yıl`}
                                                subtext="Yatırımınızı kurtarın"
                                                highlight
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Savings */}
                                <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                                    <CardContent className="p-6 md:p-8">
                                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                            Tasarruf Özeti
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <ResultCard
                                                icon={<Banknote className="h-5 w-5" />}
                                                label="Yıllık Tasarruf"
                                                value={formatCurrency(result.yearlySavings)}
                                                highlight
                                            />
                                            <ResultCard
                                                icon={<TrendingUp className="h-5 w-5" />}
                                                label="25 Yıllık Toplam"
                                                value={formatCurrency(result.savings25Year)}
                                                subtext="Elektrik zamları dahil"
                                                highlight
                                            />
                                            <ResultCard
                                                icon={<Leaf className="h-5 w-5" />}
                                                label="CO₂ Tasarrufu"
                                                value={`${formatNumber(result.co2Saved)} kg`}
                                                subtext={`${formatNumber(result.treesEquivalent)} ağaç eşdeğeri`}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Environmental Impact */}
                                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 border border-green-500/20">
                                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20">
                                            <TreeDeciduous className="h-10 w-10 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                                                Çevresel Etkini Gör
                                            </h3>
                                            <p className="text-muted-foreground mt-1">
                                                25 yılda <strong className="text-foreground">{formatNumber(result.co2Saved)} kg CO₂</strong> emisyonunu
                                                önleyeceksin. Bu, <strong className="text-foreground">{formatNumber(result.treesEquivalent)} ağacın</strong> yıllık
                                                karbon emilimine eşdeğer!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ROI Chart */}
                                <Card>
                                    <CardContent className="p-6 md:p-8">
                                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                            25 Yıllık Yatırım Getirisi
                                        </h2>
                                        <ROIChart
                                            investmentCost={(result.estimatedCost.min + result.estimatedCost.max) / 2}
                                            yearlySavings={result.yearlySavings}
                                        />
                                    </CardContent>
                                </Card>

                                {/* CTA */}
                                <Card className="gradient-primary text-white overflow-hidden">
                                    <CardContent className="p-6 md:p-8 text-center relative">
                                        <h3 className="text-2xl font-bold mb-3">
                                            Gerçek Teklifleri Görmek İster misin?
                                        </h3>
                                        <p className="opacity-90 mb-6 max-w-md mx-auto">
                                            Doğrulanmış firmalardan ücretsiz teklif al. Tam olarak ne kadar tasarruf edeceğini öğren.
                                        </p>
                                        <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                                            <Link href="/teklif-al">
                                                Ücretsiz Teklif Al
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </Button>

                                        {/* Decorative */}
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                                        <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full" />
                                    </CardContent>
                                </Card>

                                {/* Disclaimer */}
                                <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
                                    * Bu hesaplama tahmini değerlerdir. Gerçek sistem boyutu, maliyet ve tasarruf; çatı durumu,
                                    yönelim, gölgeleme ve yerel koşullara göre değişebilir. Kesin bilgi için firmalardan teklif alınız.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
