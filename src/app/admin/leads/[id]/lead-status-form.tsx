'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { updateLeadStatus, assignInstaller } from '@/app/actions/leads'
import { LEAD_STATUSES } from '@/lib/constants'

type Props = {
    leadId: string
    currentStatus: string
    currentNotes: string | null
    assignedInstallerId: string | null
    installers: { id: string; company_name: string }[]
}

export function LeadStatusForm({
    leadId,
    currentStatus,
    currentNotes,
    assignedInstallerId,
    installers,
}: Props) {
    const router = useRouter()
    const [status, setStatus] = useState(currentStatus)
    const [notes, setNotes] = useState(currentNotes || '')
    const [installerId, setInstallerId] = useState(assignedInstallerId || '')
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleStatusUpdate = async () => {
        setIsUpdating(true)
        setError(null)

        try {
            const result = await updateLeadStatus({
                leadId,
                status,
                notes: notes || undefined,
            })

            if (result.success) {
                router.refresh()
            } else {
                setError(result.error || 'Güncelleme başarısız')
            }
        } catch (err) {
            setError('Bir hata oluştu')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleInstallerAssign = async () => {
        setIsUpdating(true)
        setError(null)

        try {
            const result = await assignInstaller({
                leadId,
                installerId: installerId || null,
            })

            if (result.success) {
                router.refresh()
            } else {
                setError(result.error || 'Atama başarısız')
            }
        } catch (err) {
            setError('Bir hata oluştu')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Durum Güncelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Durum</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {LEAD_STATUSES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Notlar</Label>
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Dahili notlar..."
                        rows={3}
                    />
                </div>

                <Button
                    onClick={handleStatusUpdate}
                    className="w-full"
                    disabled={isUpdating}
                >
                    {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Durumu Güncelle
                </Button>

                <div className="space-y-2 pt-4 border-t">
                    <Label>Firma Ata</Label>
                    <Select value={installerId} onValueChange={setInstallerId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Firma seçin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Atama Yok</SelectItem>
                            {installers.map((installer) => (
                                <SelectItem key={installer.id} value={installer.id}>
                                    {installer.company_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleInstallerAssign}
                        variant="outline"
                        className="w-full"
                        disabled={isUpdating}
                    >
                        Firma Ata
                    </Button>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                        {error}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
