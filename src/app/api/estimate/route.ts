import { z } from 'zod'
import { NextResponse } from 'next/server'
import {
    calculateSolarEstimate,
    formatRange,
    formatCurrencyRange
} from '@/lib/solar-calculator'

// Input validation schema
const estimateInputSchema = z.object({
    city: z.string().min(1, 'Şehir gerekli'),
    district: z.string().optional(),
    property_type: z.enum(['mustakil', 'site', 'isyeri'], {
        message: 'Geçersiz mülk tipi',
    }),
    bill_range: z.string().min(1, 'Fatura aralığı gerekli'),
    roof_type: z.enum(['duz', 'egimli', 'bilmiyorum'], {
        message: 'Geçersiz çatı tipi',
    }),
    lat: z.number().optional(),
    lng: z.number().optional(),
})

export type EstimateInput = z.infer<typeof estimateInputSchema>

export interface EstimateResponse {
    roof_area_range_m2: [number, number]
    usable_area_range_m2: [number, number]
    system_size_kwp_range: [number, number]
    panel_count_range: [number, number]
    cost_range_try: [number, number]
    monthly_savings_try_range: [number, number]
    annual_savings_try_range: [number, number]
    payback_years_range: [number, number]
    co2_saved_kg_year: number
    disclaimer: string
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate input
        const validationResult = estimateInputSchema.safeParse(body)

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Geçersiz veri',
                    details: validationResult.error.issues
                },
                { status: 400 }
            )
        }

        const input = validationResult.data

        // Calculate estimate using existing logic
        const estimate = calculateSolarEstimate({
            city: input.city,
            district: input.district,
            property_type: input.property_type,
            bill_range: input.bill_range,
            roof_type: input.roof_type,
        })

        // Format response
        const response: EstimateResponse = {
            roof_area_range_m2: [estimate.roofArea.min, estimate.roofArea.max],
            usable_area_range_m2: [estimate.usableArea.min, estimate.usableArea.max],
            system_size_kwp_range: [estimate.systemSize.min, estimate.systemSize.max],
            panel_count_range: [estimate.panelCount.min, estimate.panelCount.max],
            cost_range_try: [estimate.costRange.min, estimate.costRange.max],
            monthly_savings_try_range: [estimate.monthlySavings.min, estimate.monthlySavings.max],
            annual_savings_try_range: [estimate.annualSavings.min, estimate.annualSavings.max],
            payback_years_range: [estimate.paybackYears.min, estimate.paybackYears.max],
            co2_saved_kg_year: estimate.co2Saved,
            disclaimer: 'Bu değerler tahmini olup kesin teklif niteliği taşımamaktadır. Gerçek maliyet ve tasarruf, yerinde keşif ve detaylı analiz sonrasında belirlenecektir. Çatı yönü, eğimi, gölgelenme durumu ve elektrik tüketim alışkanlıklarınız üretimi etkileyebilir.',
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Estimate API error:', error)
        return NextResponse.json(
            { error: 'Tahmin hesaplanamadı' },
            { status: 500 }
        )
    }
}

// Also support GET for simple queries (optional)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const city = searchParams.get('city')
    const property_type = searchParams.get('property_type')
    const bill_range = searchParams.get('bill_range')
    const roof_type = searchParams.get('roof_type')

    if (!city || !property_type || !bill_range || !roof_type) {
        return NextResponse.json(
            { error: 'Eksik parametreler' },
            { status: 400 }
        )
    }

    // Redirect to POST logic
    const body = {
        city,
        district: searchParams.get('district') || undefined,
        property_type,
        bill_range,
        roof_type,
        lat: searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : undefined,
        lng: searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : undefined,
    }

    // Create fake request and call POST
    const fakeRequest = new Request(request.url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })

    return POST(fakeRequest)
}
