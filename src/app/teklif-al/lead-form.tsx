'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { submitLead } from '@/app/actions/leads'
import { leadFormSchema, type LeadFormData } from '@/lib/validations'
import {
    CITIES,
    BILL_RANGES,
    PROPERTY_TYPES,
    ROOF_TYPES,
    TIMELINES,
    BUDGET_RANGES,
} from '@/lib/constants'
import { events } from '@/lib/analytics'
import { WhatsAppLink } from '@/components/whatsapp-button'
import { SolarEstimateDisplay } from '@/components/solar-estimate'
import { AddressPicker, type AddressData } from '@/components/maps/AddressPicker'
import Link from 'next/link'

const TOTAL_STEPS = 5

export function LeadForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [leadId, setLeadId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showEstimate, setShowEstimate] = useState(true)
    const [submittedData, setSubmittedData] = useState<LeadFormData | null>(null)

    const form = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            city: '',
            district: '',
            property_type: undefined,
            bill_range: '',
            roof_type: undefined,
            shading: false,
            timeline: undefined,
            budget_range: '',
            full_name: '',
            phone: '',
            consent_kvkk: false,
            consent_contact: false,
            // Address fields
            address_text: undefined,
            place_id: undefined,
            lat: undefined,
            lng: undefined,
        },
        mode: 'onChange',
    })

    // Handle address selection from AddressPicker
    const handleAddressSelect = (data: AddressData | null) => {
        if (data) {
            form.setValue('address_text', data.formatted_address)
            form.setValue('place_id', data.place_id)
            form.setValue('lat', data.lat)
            form.setValue('lng', data.lng)
        } else {
            form.setValue('address_text', undefined)
            form.setValue('place_id', undefined)
            form.setValue('lat', undefined)
            form.setValue('lng', undefined)
        }
    }

    const nextStep = async () => {
        let fieldsToValidate: (keyof LeadFormData)[] = []

        switch (step) {
            case 1:
                fieldsToValidate = ['city', 'district', 'property_type']
                break
            case 2:
                fieldsToValidate = ['bill_range']
                break
            case 3:
                fieldsToValidate = ['roof_type']
                break
            case 4:
                fieldsToValidate = ['timeline']
                break
        }

        const isValid = await form.trigger(fieldsToValidate)
        if (isValid) {
            events.leadFormStepCompleted(step)
            setStep(step + 1)
        }
    }

    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    const onSubmit = async (data: LeadFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const result = await submitLead(data)

            if (result.success && result.data) {
                setIsSuccess(true)
                setLeadId(result.data.leadId as string)
                setSubmittedData(data)
                events.leadFormSubmitted(result.data.leadId as string, result.data.score as number)
            } else {
                setError(result.error || 'Bir hata oluştu')
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess && submittedData) {
        return (
            <div className="space-y-6">
                {/* Success Card */}
                <Card className="shadow-xl">
                    <CardContent className="pt-8 pb-6 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Başvurunuz Alındı!</h2>
                        <p className="text-muted-foreground mb-6">
                            En kısa sürede (24 saat içinde) size dönüş yapacağız.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <WhatsAppLink
                                leadId={leadId || undefined}
                                source="form-success"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-white font-medium hover:bg-[#20bd5a] transition-colors"
                            >
                                WhatsApp ile Hızlı İletişim
                            </WhatsAppLink>

                            <Button variant="outline" asChild>
                                <Link href="/">Ana Sayfaya Dön</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Solar Estimate Toggle */}
                <button
                    onClick={() => setShowEstimate(!showEstimate)}
                    className="w-full flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                    <span className="font-semibold">Ön Güneş Enerjisi Analizi</span>
                    {showEstimate ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </button>

                {/* Solar Estimate Panel */}
                {showEstimate && (
                    <Card className="shadow-xl">
                        <CardContent className="pt-6">
                            <SolarEstimateDisplay
                                city={submittedData.city}
                                district={submittedData.district}
                                property_type={submittedData.property_type}
                                bill_range={submittedData.bill_range}
                                roof_type={submittedData.roof_type}
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
        )
    }


    return (
        <Card className="shadow-xl">
            <CardContent className="pt-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Adım {step} / {TOTAL_STEPS}</span>
                        <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                        />
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Step 1: Location & Property */}
                        {step === 1 && (
                            <div className="space-y-4 animate-fade-in">
                                <h2 className="text-xl font-semibold mb-4">Mülk Bilgileri</h2>

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>İl</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="İl seçin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {CITIES.map((city) => (
                                                        <SelectItem key={city} value={city}>
                                                            {city}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>İlçe</FormLabel>
                                            <FormControl>
                                                <Input placeholder="İlçe adı" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="property_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mülk Tipi</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Mülk tipini seçin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {PROPERTY_TYPES.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Address Picker */}
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium">Kurulum Adresi (Opsiyonel)</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Adres seçerseniz uydu görüntüsü ile çatınızı görebilirsiniz.
                                    </p>
                                    <AddressPicker onAddressSelect={handleAddressSelect} />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Bill Range */}
                        {step === 2 && (
                            <div className="space-y-4 animate-fade-in">
                                <h2 className="text-xl font-semibold mb-4">Elektrik Faturası</h2>

                                <FormField
                                    control={form.control}
                                    name="bill_range"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Aylık Ortalama Elektrik Faturanız</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Fatura aralığı seçin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {BILL_RANGES.map((range) => (
                                                        <SelectItem key={range.value} value={range.value}>
                                                            {range.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <p className="text-sm text-muted-foreground">
                                    Fatura tutarı, önerilecek sistem büyüklüğünü belirlememize yardımcı olur.
                                </p>
                            </div>
                        )}

                        {/* Step 3: Roof */}
                        {step === 3 && (
                            <div className="space-y-4 animate-fade-in">
                                <h2 className="text-xl font-semibold mb-4">Çatı Durumu</h2>

                                <FormField
                                    control={form.control}
                                    name="roof_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Çatı Tipi</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Çatı tipini seçin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {ROOF_TYPES.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="shading"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Çatımda gölge oluşturan yapı var
                                                </FormLabel>
                                                <p className="text-sm text-muted-foreground">
                                                    Ağaç, bina, baca vb. gölge oluşturuyorsa işaretleyin
                                                </p>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {/* Step 4: Timeline & Budget */}
                        {step === 4 && (
                            <div className="space-y-4 animate-fade-in">
                                <h2 className="text-xl font-semibold mb-4">Zaman & Bütçe</h2>

                                <FormField
                                    control={form.control}
                                    name="timeline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ne Zaman Kurmak İstiyorsunuz?</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Süre seçin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {TIMELINES.map((time) => (
                                                        <SelectItem key={time.value} value={time.value}>
                                                            {time.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="budget_range"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bütçe Aralığı (Opsiyonel)</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Bütçe seçin (opsiyonel)" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {BUDGET_RANGES.map((budget) => (
                                                        <SelectItem key={budget.value || 'none'} value={budget.value || 'none'}>
                                                            {budget.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {/* Step 5: Contact Info */}
                        {step === 5 && (
                            <div className="space-y-4 animate-fade-in">
                                <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>

                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ad Soyad</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Adınız Soyadınız" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefon</FormLabel>
                                            <FormControl>
                                                <Input placeholder="05XX XXX XX XX" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="consent_kvkk"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-normal">
                                                    <Link href="/kvkk" className="underline" target="_blank">
                                                        KVKK Aydınlatma Metni
                                                    </Link>
                                                    &apos;ni okudum, kabul ediyorum.
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="consent_contact"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-normal">
                                                    Telefon ve SMS ile iletişime geçilmesini kabul ediyorum.
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {error && (
                                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                        {error}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                            {step > 1 ? (
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Geri
                                </Button>
                            ) : (
                                <div />
                            )}

                            {step < TOTAL_STEPS ? (
                                <Button type="button" onClick={nextStep}>
                                    Devam
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        <>
                                            Teklif Al
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
