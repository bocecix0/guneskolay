'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, X, Loader2 } from 'lucide-react'
import { updateInstallerStatus } from '@/app/actions/installers'

type Props = {
    installerId: string
    currentStatus: string
}

export function InstallerStatusButtons({ installerId, currentStatus }: Props) {
    const router = useRouter()
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusChange = async (newStatus: 'approved' | 'rejected') => {
        setIsUpdating(true)

        try {
            const result = await updateInstallerStatus({
                installerId,
                status: newStatus,
            })

            if (result.success) {
                router.refresh()
            }
        } catch (err) {
            console.error('Error updating status:', err)
        } finally {
            setIsUpdating(false)
        }
    }

    if (currentStatus !== 'pending') {
        return null
    }

    return (
        <div className="flex gap-1">
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleStatusChange('approved')}
                disabled={isUpdating}
            >
                {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Check className="h-4 w-4" />
                )}
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleStatusChange('rejected')}
                disabled={isUpdating}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
