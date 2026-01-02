import { Metadata } from 'next'
import { InstallerForm } from './installer-form'

export const metadata: Metadata = {
    title: 'Firma Olarak Katıl',
    description: 'GüneşKolay platformuna kurulumcu firma olarak katılın. Doğrulanmış müşterilere ulaşın.',
    openGraph: {
        title: 'Firma Olarak Katıl | GüneşKolay',
        description: 'GüneşKolay platformuna kurulumcu firma olarak katılın.',
    },
}

export default function FirmaKatilPage() {
    return (
        <div className="min-h-screen gradient-hero py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            Firma Olarak Katıl
                        </h1>
                        <p className="mt-4 text-muted-foreground">
                            Platformumuza katılın, nitelikli müşterilere ulaşın.
                        </p>
                    </div>

                    <InstallerForm />
                </div>
            </div>
        </div>
    )
}
