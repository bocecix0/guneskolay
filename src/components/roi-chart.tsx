'use client'

import { useEffect, useRef, useState } from 'react'

interface ROIDataPoint {
    year: number
    savings: number
    cumulative: number
}

interface ROIChartProps {
    investmentCost: number
    yearlySavings: number
    electricityInflation?: number
    years?: number
}

export function ROIChart({
    investmentCost,
    yearlySavings,
    electricityInflation = 0.25,
    years = 25,
}: ROIChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredPoint, setHoveredPoint] = useState<ROIDataPoint | null>(null)

    // Generate data points
    const data: ROIDataPoint[] = []
    let cumulative = 0
    let currentSavings = yearlySavings

    for (let year = 1; year <= years; year++) {
        cumulative += currentSavings
        data.push({
            year,
            savings: Math.round(currentSavings),
            cumulative: Math.round(cumulative),
        })
        currentSavings *= (1 + electricityInflation)
    }

    // Find payback year
    const paybackYear = data.findIndex(d => d.cumulative >= investmentCost) + 1

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

        if (canvasRef.current) {
            observer.observe(canvasRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !isVisible) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height
        const padding = { top: 20, right: 20, bottom: 40, left: 70 }
        const chartWidth = width - padding.left - padding.right
        const chartHeight = height - padding.top - padding.bottom

        const maxCumulative = data[data.length - 1].cumulative
        const yMax = Math.ceil(maxCumulative / 1000000) * 1000000

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw grid lines
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (i / 5) * chartHeight
            ctx.beginPath()
            ctx.moveTo(padding.left, y)
            ctx.lineTo(width - padding.right, y)
            ctx.stroke()

            // Y-axis labels
            ctx.fillStyle = '#9ca3af'
            ctx.font = '11px sans-serif'
            ctx.textAlign = 'right'
            const value = yMax - (i / 5) * yMax
            ctx.fillText(formatCurrency(value), padding.left - 8, y + 4)
        }

        // Draw investment line
        const investmentY = padding.top + (1 - investmentCost / yMax) * chartHeight
        ctx.strokeStyle = '#ef4444'
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(padding.left, investmentY)
        ctx.lineTo(width - padding.right, investmentY)
        ctx.stroke()
        ctx.setLineDash([])

        // Investment label
        ctx.fillStyle = '#ef4444'
        ctx.font = 'bold 11px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText('Yatırım Maliyeti', padding.left + 5, investmentY - 8)

        // Animate cumulative savings line
        const animationDuration = 1500
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / animationDuration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

            const pointsToShow = Math.floor(easeProgress * data.length)

            // Clear chart area
            ctx.clearRect(padding.left, padding.top, chartWidth, chartHeight)

            // Redraw grid
            ctx.strokeStyle = '#e5e7eb'
            ctx.lineWidth = 1
            for (let i = 0; i <= 5; i++) {
                const y = padding.top + (i / 5) * chartHeight
                ctx.beginPath()
                ctx.moveTo(padding.left, y)
                ctx.lineTo(width - padding.right, y)
                ctx.stroke()
            }

            // Redraw investment line
            ctx.strokeStyle = '#ef4444'
            ctx.setLineDash([5, 5])
            ctx.beginPath()
            ctx.moveTo(padding.left, investmentY)
            ctx.lineTo(width - padding.right, investmentY)
            ctx.stroke()
            ctx.setLineDash([])

            // Draw area fill
            ctx.fillStyle = 'rgba(249, 115, 22, 0.1)'
            ctx.beginPath()
            ctx.moveTo(padding.left, padding.top + chartHeight)

            for (let i = 0; i < pointsToShow; i++) {
                const x = padding.left + (i / (years - 1)) * chartWidth
                const y = padding.top + (1 - data[i].cumulative / yMax) * chartHeight
                ctx.lineTo(x, y)
            }

            if (pointsToShow > 0) {
                const lastX = padding.left + ((pointsToShow - 1) / (years - 1)) * chartWidth
                ctx.lineTo(lastX, padding.top + chartHeight)
            }
            ctx.closePath()
            ctx.fill()

            // Draw line
            ctx.strokeStyle = '#f97316'
            ctx.lineWidth = 3
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'
            ctx.beginPath()

            for (let i = 0; i < pointsToShow; i++) {
                const x = padding.left + (i / (years - 1)) * chartWidth
                const y = padding.top + (1 - data[i].cumulative / yMax) * chartHeight
                if (i === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }
            }
            ctx.stroke()

            // Draw payback marker if reached
            if (paybackYear > 0 && paybackYear <= pointsToShow) {
                const markerX = padding.left + ((paybackYear - 1) / (years - 1)) * chartWidth
                const markerY = padding.top + (1 - data[paybackYear - 1].cumulative / yMax) * chartHeight

                ctx.fillStyle = '#22c55e'
                ctx.beginPath()
                ctx.arc(markerX, markerY, 8, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = '#ffffff'
                ctx.font = 'bold 10px sans-serif'
                ctx.textAlign = 'center'
                ctx.fillText('✓', markerX, markerY + 3)
            }

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        animate()

        // Draw X-axis labels
        ctx.fillStyle = '#9ca3af'
        ctx.font = '11px sans-serif'
        ctx.textAlign = 'center'
        for (let i = 0; i < years; i += 5) {
            const x = padding.left + (i / (years - 1)) * chartWidth
            ctx.fillText(`${i + 1}. yıl`, x, height - 10)
        }
        ctx.fillText(`${years}. yıl`, width - padding.right, height - 10)
    }, [isVisible, data, investmentCost, years, paybackYear])

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const padding = { left: 70, right: 20 }
        const chartWidth = canvas.width - padding.left - padding.right

        const yearIndex = Math.round(((x - padding.left) / chartWidth) * (years - 1))
        if (yearIndex >= 0 && yearIndex < data.length) {
            setHoveredPoint(data[yearIndex])
        } else {
            setHoveredPoint(null)
        }
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={300}
                    className="w-full h-auto"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Tooltip */}
                {hoveredPoint && (
                    <div className="absolute top-2 right-2 bg-background/95 backdrop-blur border rounded-lg p-3 text-sm shadow-lg">
                        <div className="font-semibold">{hoveredPoint.year}. Yıl</div>
                        <div className="text-muted-foreground">
                            Yıllık: <span className="text-primary font-medium">{formatCurrency(hoveredPoint.savings)}</span>
                        </div>
                        <div className="text-muted-foreground">
                            Toplam: <span className="text-primary font-medium">{formatCurrency(hoveredPoint.cumulative)}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">~{paybackYear} yıl</div>
                    <div className="text-xs text-muted-foreground">Geri Ödeme</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{formatCurrency(data[data.length - 1].cumulative)}</div>
                    <div className="text-xs text-muted-foreground">25 Yıl Toplam</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">
                        {Math.round((data[data.length - 1].cumulative / investmentCost - 1) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Yatırım Getirisi</div>
                </div>
            </div>
        </div>
    )
}

function formatCurrency(value: number): string {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M ₺`
    } else if (value >= 1000) {
        return `${Math.round(value / 1000)}K ₺`
    }
    return `${Math.round(value)} ₺`
}
