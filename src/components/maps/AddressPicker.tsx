'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, MapPin, Check, X, Satellite } from 'lucide-react'
import { loadGoogleMapsScript, isGoogleMapsLoaded } from '@/lib/google-maps'
import { cn } from '@/lib/utils'

export interface AddressData {
    formatted_address: string
    place_id: string
    lat: number
    lng: number
}

interface AddressPickerProps {
    onAddressSelect: (data: AddressData | null) => void
    defaultValue?: AddressData | null
    className?: string
}

export function AddressPicker({ onAddressSelect, defaultValue, className }: AddressPickerProps) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState(defaultValue?.formatted_address || '')
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(defaultValue || null)
    const [isConfirmed, setIsConfirmed] = useState(!!defaultValue)
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null)
    const placesService = useRef<google.maps.places.PlacesService | null>(null)
    const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null)

    // Load Google Maps script
    useEffect(() => {
        loadGoogleMapsScript()
            .then(() => {
                setIsScriptLoaded(true)
                setIsLoading(false)
            })
            .catch((err) => {
                setError('Harita yüklenemedi')
                setIsLoading(false)
                console.error(err)
            })
    }, [])

    // Initialize services when script loads
    useEffect(() => {
        if (!isScriptLoaded || !isGoogleMapsLoaded()) return

        autocompleteService.current = new google.maps.places.AutocompleteService()

        // Create a dummy div for PlacesService (required)
        const dummyDiv = document.createElement('div')
        placesService.current = new google.maps.places.PlacesService(dummyDiv)

        sessionToken.current = new google.maps.places.AutocompleteSessionToken()
    }, [isScriptLoaded])

    // Debounced search
    const searchPlaces = useCallback((query: string) => {
        if (!autocompleteService.current || query.length < 3) {
            setSuggestions([])
            return
        }

        autocompleteService.current.getPlacePredictions(
            {
                input: query,
                componentRestrictions: { country: 'tr' },
                sessionToken: sessionToken.current!,
                types: ['address'],
            },
            (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setSuggestions(predictions)
                    setShowSuggestions(true)
                } else {
                    setSuggestions([])
                }
            }
        )
    }, [])

    // Handle input change with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue && !isConfirmed) {
                searchPlaces(inputValue)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [inputValue, isConfirmed, searchPlaces])

    // Handle place selection
    const handleSelectPlace = (prediction: google.maps.places.AutocompletePrediction) => {
        if (!placesService.current) return

        setShowSuggestions(false)
        setIsLoading(true)

        placesService.current.getDetails(
            {
                placeId: prediction.place_id,
                fields: ['formatted_address', 'place_id', 'geometry'],
                sessionToken: sessionToken.current!,
            },
            (place, status) => {
                setIsLoading(false)

                if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                    const addressData: AddressData = {
                        formatted_address: place.formatted_address || prediction.description,
                        place_id: place.place_id || prediction.place_id,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    }

                    setSelectedAddress(addressData)
                    setInputValue(addressData.formatted_address)

                    // Create new session token for next search
                    sessionToken.current = new google.maps.places.AutocompleteSessionToken()
                } else {
                    setError('Adres detayları alınamadı')
                }
            }
        )
    }

    // Confirm address
    const handleConfirm = () => {
        if (selectedAddress) {
            setIsConfirmed(true)
            onAddressSelect(selectedAddress)
        }
    }

    // Reset selection
    const handleReset = () => {
        setSelectedAddress(null)
        setIsConfirmed(false)
        setInputValue('')
        setSuggestions([])
        onAddressSelect(null)
    }

    // Get static map URL (using browser key for satellite preview)
    const getStaticMapUrl = (lat: number, lng: number) => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey) return null

        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=19&size=400x200&maptype=satellite&markers=color:red%7C${lat},${lng}&key=${apiKey}`
    }

    if (isLoading && !isScriptLoaded) {
        return (
            <div className={cn('flex items-center justify-center p-8', className)}>
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Harita yükleniyor...</span>
            </div>
        )
    }

    if (error && !isScriptLoaded) {
        return (
            <div className={cn('p-4 bg-destructive/10 rounded-lg text.destructive text-center', className)}>
                {error}
            </div>
        )
    }

    return (
        <div className={cn('space-y-4', className)}>
            {/* Address Input */}
            {!isConfirmed && (
                <div className="relative">
                    <Label htmlFor="address-input" className="mb-2 block">
                        Kurulum Adresi
                    </Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            ref={inputRef}
                            id="address-input"
                            type="text"
                            placeholder="Adres aramak için yazmaya başlayın..."
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                setSelectedAddress(null)
                            }}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            className="pl-10"
                            autoComplete="off"
                        />
                        {isLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <Card className="absolute z-50 w-full mt-1 shadow-lg">
                            <CardContent className="p-0">
                                <ul className="max-h-60 overflow-auto">
                                    {suggestions.map((suggestion) => (
                                        <li key={suggestion.place_id}>
                                            <button
                                                type="button"
                                                className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b last:border-0 text-sm"
                                                onClick={() => handleSelectPlace(suggestion)}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                                                    <div>
                                                        <p className="font-medium">{suggestion.structured_formatting.main_text}</p>
                                                        <p className="text-muted-foreground text-xs">
                                                            {suggestion.structured_formatting.secondary_text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Selected Address Preview */}
            {selectedAddress && (
                <Card className={cn('overflow-hidden', isConfirmed && 'border-green-500')}>
                    <CardContent className="p-0">
                        {/* Satellite Preview */}
                        <div className="relative">
                            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                <Satellite className="h-3 w-3" />
                                Uydu Görünümü
                            </div>
                            {getStaticMapUrl(selectedAddress.lat, selectedAddress.lng) ? (
                                <img
                                    src={getStaticMapUrl(selectedAddress.lat, selectedAddress.lng)!}
                                    alt="Konum önizleme"
                                    className="w-full h-[160px] object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-[160px] bg-muted flex items-center justify-center">
                                    <span className="text-muted-foreground text-sm">Harita önizleme mevcut değil</span>
                                </div>
                            )}
                        </div>

                        {/* Address Text */}
                        <div className="p-4">
                            <p className="text-sm font-medium mb-3">{selectedAddress.formatted_address}</p>

                            {/* Action Buttons */}
                            {!isConfirmed ? (
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={handleConfirm}
                                        className="flex-1"
                                    >
                                        <Check className="h-4 w-4 mr-2" />
                                        Bu adres doğru
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleReset}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                        <Check className="h-4 w-4" />
                                        Adres onaylandı
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleReset}
                                    >
                                        Değiştir
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Helper Text */}
            {!selectedAddress && !isLoading && (
                <p className="text-xs text-muted-foreground">
                    Kurulum yapılacak adresi seçin. Uydu görüntüsü ile çatınızı görebilirsiniz.
                </p>
            )}
        </div>
    )
}
