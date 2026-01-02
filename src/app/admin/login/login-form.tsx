'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Loader2, Mail, Sun } from 'lucide-react'
import { sendMagicLink } from '@/app/actions/auth'
import { magicLinkSchema, type MagicLinkFormData } from '@/lib/validations'

export function AdminLoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<MagicLinkFormData>({
        resolver: zodResolver(magicLinkSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = async (data: MagicLinkFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const result = await sendMagicLink(data)

            if (result.success) {
                setIsSuccess(true)
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
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <CardTitle>E-posta Gönderildi!</CardTitle>
                    <CardDescription>
                        Giriş linki e-posta adresinize gönderildi.
                        Lütfen gelen kutunuzu kontrol edin.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                        <Sun className="h-6 w-6 text-white" />
                    </div>
                </div>
                <CardTitle>Admin Girişi</CardTitle>
                <CardDescription>
                    E-posta adresinize giriş linki göndereceğiz.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-posta</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="admin@guneskolay.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                'Giriş Linki Gönder'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
