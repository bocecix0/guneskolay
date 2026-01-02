/**
 * Lead Scoring Algorithm
 * 
 * Scores leads 0-100 based on purchase readiness signals.
 * Higher score = more likely to convert.
 */

type LeadData = {
    timeline: 'hemen' | '1-3-ay' | '3-6-ay'
    bill_range: string
    property_type: 'mustakil' | 'site' | 'isyeri'
    roof_type: 'duz' | 'egimli' | 'bilmiyorum'
    shading: boolean
    city: string
    district: string
}

type ScoreBreakdown = {
    timeline: number
    billAmount: number
    propertyType: number
    roofClarity: number
    shading: number
    locationClarity: number
    total: number
}

// Bill range mapping to score (higher bill = more value from solar)
const BILL_SCORE_MAP: Record<string, number> = {
    '0-500': 5,
    '500-1000': 10,
    '1000-2000': 15,
    '2000-3000': 20,
    '3000-5000': 25,
    '5000+': 25,
}

export function calculateLeadScore(data: LeadData): { score: number; breakdown: ScoreBreakdown } {
    let breakdown: ScoreBreakdown = {
        timeline: 0,
        billAmount: 0,
        propertyType: 0,
        roofClarity: 0,
        shading: 0,
        locationClarity: 0,
        total: 0,
    }

    // Timeline Score (max 30 points)
    // "hemen" = ready now, highest priority
    switch (data.timeline) {
        case 'hemen':
            breakdown.timeline = 30
            break
        case '1-3-ay':
            breakdown.timeline = 20
            break
        case '3-6-ay':
            breakdown.timeline = 10
            break
    }

    // Bill Amount Score (max 25 points)
    breakdown.billAmount = BILL_SCORE_MAP[data.bill_range] || 10

    // Property Type Score (max 20 points)
    // Müstakil = easier installation, full control
    switch (data.property_type) {
        case 'mustakil':
            breakdown.propertyType = 20
            break
        case 'isyeri':
            breakdown.propertyType = 15
            break
        case 'site':
            breakdown.propertyType = 10 // More complex, needs building approval
            break
    }

    // Roof Clarity Score (max 15 points)
    // Knowing roof type = more qualified
    switch (data.roof_type) {
        case 'duz':
        case 'egimli':
            breakdown.roofClarity = 15
            break
        case 'bilmiyorum':
            breakdown.roofClarity = 5
            break
    }

    // Shading Score (max 5 points)
    // No shading = better solar potential
    breakdown.shading = data.shading ? 0 : 5

    // Location Clarity Score (max 5 points)
    // Having both city and district = more serious
    if (data.city && data.district) {
        breakdown.locationClarity = 5
    } else if (data.city) {
        breakdown.locationClarity = 2
    }

    // Calculate total
    breakdown.total =
        breakdown.timeline +
        breakdown.billAmount +
        breakdown.propertyType +
        breakdown.roofClarity +
        breakdown.shading +
        breakdown.locationClarity

    return {
        score: Math.min(100, breakdown.total),
        breakdown,
    }
}

/**
 * Get human-readable score label
 */
export function getScoreLabel(score: number): { label: string; color: string } {
    if (score >= 80) {
        return { label: 'Çok Yüksek', color: 'text-green-600' }
    }
    if (score >= 60) {
        return { label: 'Yüksek', color: 'text-blue-600' }
    }
    if (score >= 40) {
        return { label: 'Orta', color: 'text-yellow-600' }
    }
    return { label: 'Düşük', color: 'text-gray-500' }
}
