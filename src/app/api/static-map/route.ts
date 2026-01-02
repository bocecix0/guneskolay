import { z } from 'zod'
import { NextResponse } from 'next/server'

// Input validation
const staticMapSchema = z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    zoom: z.number().min(1).max(21).optional().default(19),
    size: z.string().regex(/^\d+x\d+$/).optional().default('600x400'),
    maptype: z.enum(['satellite', 'hybrid', 'roadmap', 'terrain']).optional().default('satellite'),
})

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const lat = searchParams.get('lat')
        const lng = searchParams.get('lng')

        if (!lat || !lng) {
            return NextResponse.json(
                { error: 'lat ve lng parametreleri gerekli' },
                { status: 400 }
            )
        }

        // Validate input
        const validationResult = staticMapSchema.safeParse({
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            zoom: searchParams.get('zoom') ? parseInt(searchParams.get('zoom')!) : undefined,
            size: searchParams.get('size') || undefined,
            maptype: searchParams.get('maptype') || undefined,
        })

        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Geçersiz parametreler', details: validationResult.error.issues },
                { status: 400 }
            )
        }

        const { lat: validLat, lng: validLng, zoom, size, maptype } = validationResult.data

        // Use server API key (IP restricted)
        const serverApiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY

        if (!serverApiKey) {
            // Fall back to browser key if server key not set
            const browserKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

            if (!browserKey) {
                return NextResponse.json(
                    { error: 'Google Maps API key yapılandırılmamış' },
                    { status: 500 }
                )
            }

            // Return URL with browser key (less secure but works)
            const url = `https://maps.googleapis.com/maps/api/staticmap?center=${validLat},${validLng}&zoom=${zoom}&size=${size}&maptype=${maptype}&markers=color:red%7C${validLat},${validLng}&key=${browserKey}`

            return NextResponse.json({ url })
        }

        // Build static map URL with server key
        const staticMapUrl = new URL('https://maps.googleapis.com/maps/api/staticmap')
        staticMapUrl.searchParams.set('center', `${validLat},${validLng}`)
        staticMapUrl.searchParams.set('zoom', zoom.toString())
        staticMapUrl.searchParams.set('size', size)
        staticMapUrl.searchParams.set('maptype', maptype)
        staticMapUrl.searchParams.set('markers', `color:red|${validLat},${validLng}`)
        staticMapUrl.searchParams.set('key', serverApiKey)

        // Option 1: Return the URL (client fetches directly)
        // return NextResponse.json({ url: staticMapUrl.toString() })

        // Option 2: Proxy the image (hides server key completely)
        try {
            const imageResponse = await fetch(staticMapUrl.toString())

            if (!imageResponse.ok) {
                throw new Error('Failed to fetch static map')
            }

            const imageBuffer = await imageResponse.arrayBuffer()

            return new NextResponse(imageBuffer, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
                },
            })
        } catch (fetchError) {
            console.error('Static map fetch error:', fetchError)
            return NextResponse.json(
                { error: 'Harita yüklenemedi' },
                { status: 502 }
            )
        }
    } catch (error) {
        console.error('Static map API error:', error)
        return NextResponse.json(
            { error: 'Sunucu hatası' },
            { status: 500 }
        )
    }
}
