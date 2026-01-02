// Google Maps Script Loader Helper
// Uses dynamic script loading to avoid SSR issues

let isLoaded = false
let isLoading = false
let loadPromise: Promise<void> | null = null

export function loadGoogleMapsScript(): Promise<void> {
    if (isLoaded) {
        return Promise.resolve()
    }

    if (isLoading && loadPromise) {
        return loadPromise
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
        return Promise.reject(new Error('Google Maps API key not configured'))
    }

    isLoading = true

    loadPromise = new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.google?.maps?.places) {
            isLoaded = true
            isLoading = false
            resolve()
            return
        }

        // Create script element
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=tr`
        script.async = true
        script.defer = true

        script.onload = () => {
            isLoaded = true
            isLoading = false
            resolve()
        }

        script.onerror = () => {
            isLoading = false
            reject(new Error('Failed to load Google Maps script'))
        }

        document.head.appendChild(script)
    })

    return loadPromise
}

export function isGoogleMapsLoaded(): boolean {
    return isLoaded && typeof window !== 'undefined' && !!window.google?.maps?.places
}

// Type declarations for Google Maps
declare global {
    interface Window {
        google: typeof google
    }
}
