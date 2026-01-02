// Solar Pre-Assessment Calculator for Turkey
// All calculations are estimates, not binding offers

type PropertyType = 'mustakil' | 'site' | 'isyeri'
type RoofType = 'duz' | 'egimli' | 'bilmiyorum'

interface SolarInput {
    city: string
    district?: string
    property_type: PropertyType
    bill_range: string
    roof_type: RoofType
}

interface SolarEstimate {
    roofArea: { min: number; max: number }
    usableArea: { min: number; max: number }
    systemSize: { min: number; max: number }
    panelCount: { min: number; max: number }
    costRange: { min: number; max: number }
    monthlySavings: { min: number; max: number }
    annualSavings: { min: number; max: number }
    paybackYears: { min: number; max: number }
    co2Saved: number // kg/year
}

// Regional solar irradiation (kWh/kWp/year) - Turkey averages
const SOLAR_IRRADIATION: Record<string, number> = {
    // Southeast (highest)
    'Şanlıurfa': 1700,
    'Mardin': 1680,
    'Gaziantep': 1650,
    'Diyarbakır': 1640,
    'Adana': 1620,
    'Mersin': 1600,
    'Antalya': 1580,
    'Hatay': 1560,
    // Aegean & Mediterranean
    'İzmir': 1520,
    'Aydın': 1500,
    'Muğla': 1480,
    'Denizli': 1450,
    // Central Anatolia
    'Konya': 1550,
    'Ankara': 1480,
    'Eskişehir': 1420,
    'Kayseri': 1450,
    // Marmara
    'İstanbul': 1380,
    'Bursa': 1400,
    'Kocaeli': 1380,
    'Tekirdağ': 1360,
    // Black Sea (lowest)
    'Samsun': 1280,
    'Trabzon': 1200,
    'Rize': 1150,
    // Default
    'default': 1450,
}

// Roof area estimates by property type (m²)
const ROOF_AREA_ESTIMATES: Record<PropertyType, { min: number; max: number }> = {
    'mustakil': { min: 80, max: 200 },
    'site': { min: 30, max: 60 },
    'isyeri': { min: 150, max: 500 },
}

// Usable roof percentage by roof type
const USABLE_ROOF_FACTOR: Record<RoofType, number> = {
    'duz': 0.70,      // Flat roofs - higher usability
    'egimli': 0.50,   // Sloped - orientation matters
    'bilmiyorum': 0.55,
}

// Bill range to estimated monthly consumption (kWh)
const BILL_TO_CONSUMPTION: Record<string, { min: number; max: number }> = {
    '500-1000': { min: 150, max: 300 },
    '1000-2000': { min: 300, max: 600 },
    '2000-3000': { min: 600, max: 900 },
    '3000-5000': { min: 900, max: 1500 },
    '5000+': { min: 1500, max: 3000 },
}

// Current market rates (TL) - Updated for 2026
const PANEL_WATT = 550 // Standard panel size
const COST_PER_KWP = { min: 18000, max: 25000 } // TL per kWp installed
const ELECTRICITY_COST_PER_KWH = 4.5 // TL average retail rate
const CO2_PER_KWH = 0.5 // kg CO2 per kWh from grid

export function calculateSolarEstimate(input: SolarInput): SolarEstimate {
    // Get solar irradiation for city
    const irradiation = SOLAR_IRRADIATION[input.city] || SOLAR_IRRADIATION['default']

    // Estimate roof area
    const roofArea = ROOF_AREA_ESTIMATES[input.property_type]

    // Calculate usable area
    const usableFactor = USABLE_ROOF_FACTOR[input.roof_type]
    const usableArea = {
        min: Math.round(roofArea.min * usableFactor),
        max: Math.round(roofArea.max * usableFactor),
    }

    // Get consumption estimate from bill
    const consumption = BILL_TO_CONSUMPTION[input.bill_range] || { min: 300, max: 600 }

    // Calculate required system size (kWp) to cover consumption
    // Formula: Annual consumption / (Irradiation * Performance ratio)
    const annualConsumption = {
        min: consumption.min * 12,
        max: consumption.max * 12
    }
    const performanceRatio = 0.80 // Typical system efficiency

    const requiredSize = {
        min: Math.round((annualConsumption.min / (irradiation * performanceRatio)) * 10) / 10,
        max: Math.round((annualConsumption.max / (irradiation * performanceRatio)) * 10) / 10,
    }

    // Calculate maximum installable size based on roof
    // ~7m² per kWp for typical installations
    const maxSizeByRoof = {
        min: Math.round((usableArea.min / 7) * 10) / 10,
        max: Math.round((usableArea.max / 7) * 10) / 10,
    }

    // System size is the lower of required vs available
    const systemSize = {
        min: Math.min(requiredSize.min, maxSizeByRoof.min),
        max: Math.min(requiredSize.max, maxSizeByRoof.max),
    }

    // Panel count
    const panelCount = {
        min: Math.ceil((systemSize.min * 1000) / PANEL_WATT),
        max: Math.ceil((systemSize.max * 1000) / PANEL_WATT),
    }

    // Cost estimate
    const costRange = {
        min: Math.round(systemSize.min * COST_PER_KWP.min),
        max: Math.round(systemSize.max * COST_PER_KWP.max),
    }

    // Annual production
    const annualProduction = {
        min: Math.round(systemSize.min * irradiation * performanceRatio),
        max: Math.round(systemSize.max * irradiation * performanceRatio),
    }

    // Savings
    const annualSavings = {
        min: Math.round(annualProduction.min * ELECTRICITY_COST_PER_KWH),
        max: Math.round(annualProduction.max * ELECTRICITY_COST_PER_KWH),
    }

    const monthlySavings = {
        min: Math.round(annualSavings.min / 12),
        max: Math.round(annualSavings.max / 12),
    }

    // Payback period
    const paybackYears = {
        min: Math.round((costRange.min / annualSavings.max) * 10) / 10,
        max: Math.round((costRange.max / annualSavings.min) * 10) / 10,
    }

    // CO2 savings
    const avgProduction = (annualProduction.min + annualProduction.max) / 2
    const co2Saved = Math.round(avgProduction * CO2_PER_KWH)

    return {
        roofArea,
        usableArea,
        systemSize,
        panelCount,
        costRange,
        monthlySavings,
        annualSavings,
        paybackYears,
        co2Saved,
    }
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export function formatRange(range: { min: number; max: number }, suffix = ''): string {
    if (range.min === range.max) {
        return `${range.min}${suffix}`
    }
    return `${range.min} - ${range.max}${suffix}`
}

export function formatCurrencyRange(range: { min: number; max: number }): string {
    return `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`
}
