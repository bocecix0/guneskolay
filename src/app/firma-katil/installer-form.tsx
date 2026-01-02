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
    FormDescription,
} from '@/components/ui/form'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { submitInstallerApplication } from '@/app/actions/installers'
import { installerFormSchema, type InstallerFormData } from '@/lib/validations'
import { CITIES, CAPACITY_OPTIONS } from '@/lib/constants'
import { events } from '@/lib/analytics'
import Link from 'next/link'

export function InstallerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<InstallerFormData>({
        resolver: zodResolver(installerFormSchema),
        defaultValues: {
            company_name: '',
            vkn: '',
            regions: [],
            capacity_per_month: 1,
            has_inhouse_install_team: false,
            website: '',
            instagram: '',
            contact_name: '',
            phone: '',
            email: '',
        },
    })

    const onSubmit = async (data: InstallerFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const result = await submitInstallerApplication(data)

            if (result.success && result.data) {
                setIsSuccess(true)
                events.installerFormSubmitted(result.data.installerId as string)
            } else {
                setError(result.error || 'Bir hata oluştu')
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <Card className="shadow-xl">
                <CardContent className="pt-10 pb-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Başvurunuz Alındı!</h2>
                    <p className="text-muted-foreground mb-6">
                        Doğrulama süreci 1-3 iş günü sürmektedir.
                        <br />
                        Sonucu e-posta ile bildireceğiz.
                    </p>

                    <Button variant="outline" asChild>
                        <Link href="/">Ana Sayfaya Dön</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-xl">
            <CardContent className="pt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Firma Bilgileri</h2>

                            <FormField
                                control={form.control}
                                name="company_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Firma Adı</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ABC Enerji A.Ş." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="vkn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vergi Kimlik Numarası (VKN)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1234567890" maxLength={10} {...field} />
                                        </FormControl>
                                        <FormDescription>10 haneli VKN</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="regions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hizmet Verdiğiniz İller</FormLabel>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                                            {CITIES.map((city) => (
                                                <label
                                                    key={city}
                                                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
                                                >
                                                    <Checkbox
                                                        checked={field.value?.includes(city)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                field.onChange([...field.value, city])
                                                            } else {
                                                                field.onChange(field.value.filter((v) => v !== city))
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-sm">{city}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <FormDescription>
                                            {field.value?.length || 0} il seçildi
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="capacity_per_month"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Aylık Kurulum Kapasitesi</FormLabel>
                                        <Select
                                            onValueChange={(val) => field.onChange(parseInt(val))}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Kapasite seçin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CAPACITY_OPTIONS.map((cap) => (
                                                    <SelectItem key={cap.value} value={cap.value.toString()}>
                                                        {cap.label}
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
                                name="has_inhouse_install_team"
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
                                                Kendi kurulum ekibimiz var
                                            </FormLabel>
                                            <FormDescription>
                                                Taşeron değil, kadrolu ekip
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Online Presence */}
                        <div className="space-y-4 pt-4 border-t">
                            <h2 className="text-xl font-semibold">Online Varlık (Opsiyonel)</h2>

                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Web Sitesi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://firmaniz.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram</FormLabel>
                                        <FormControl>
                                            <Input placeholder="@firmaniz" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 pt-4 border-t">
                            <h2 className="text-xl font-semibold">İletişim Bilgileri</h2>

                            <FormField
                                control={form.control}
                                name="contact_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Yetkili Ad Soyad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ahmet Yılmaz" {...field} />
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-posta</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="info@firmaniz.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                'Başvuru Yap'
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            Başvuru yaparak{' '}
                            <Link href="/gizlilik" className="underline">
                                Gizlilik Politikası
                            </Link>
                            &apos;nı kabul etmiş olursunuz.
                        </p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
