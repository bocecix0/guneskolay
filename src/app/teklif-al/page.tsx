import { Metadata } from 'next'
import { LeadForm } from './lead-form'

export const metadata: Metadata = {
    title: 'Ücretsiz Teklif Al',
    description: 'Güneş enerjisi kurulumu için doğrulanmış firmalardan ücretsiz teklif alın. 2 dakikada formu doldurun.',
    openGraph: {
        title: 'Ücretsiz Güneş Enerjisi Teklifi Al | GüneşKolay',
        description: 'Güneş enerjisi kurulumu için doğrulanmış firmalardan ücretsiz teklif alın.',
    },
}

export default function TeklifAlPage() {
    return (
        <div className="min-h-screen gradient-hero py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            Ücretsiz Teklif Al
                        </h1>
                        <p className="mt-4 text-muted-foreground">
                            2 dakikada formu doldur, doğrulanmış firmalardan teklif al.
                        </p>
                    </div>

                    <LeadForm />
                </div>
            </div>
        </div>
    )
}
