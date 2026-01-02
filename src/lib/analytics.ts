/**
 * Simple Analytics Wrapper
 * 
 * A lightweight event tracking system that can be extended
 * to integrate with any analytics service (GA4, Mixpanel, etc.)
 */

type EventProperties = Record<string, string | number | boolean | undefined>

type AnalyticsEvent = {
    name: string
    properties?: EventProperties
    timestamp: number
}

// In-memory event queue (for development/debugging)
const eventQueue: AnalyticsEvent[] = []

/**
 * Track a custom event
 */
export function track(eventName: string, properties?: EventProperties): void {
    const event: AnalyticsEvent = {
        name: eventName,
        properties,
        timestamp: Date.now(),
    }

    // Add to queue for debugging
    eventQueue.push(event)

    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', eventName, properties)
    }

    // TODO: Send to analytics service
    // Example: window.gtag?.('event', eventName, properties)
    // Example: window.mixpanel?.track(eventName, properties)
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string): void {
    track('page_view', {
        path,
        title,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    })
}

/**
 * Pre-defined events for GüneşKolay
 */
export const events = {
    // Lead Form Events
    leadFormStarted: () => track('lead_form_started'),
    leadFormStepCompleted: (step: number) => track('lead_form_step_completed', { step }),
    leadFormSubmitted: (leadId: string, score: number) =>
        track('lead_form_submitted', { leadId, score }),
    leadFormAbandoned: (step: number) => track('lead_form_abandoned', { step }),

    // Installer Form Events
    installerFormStarted: () => track('installer_form_started'),
    installerFormSubmitted: (installerId: string) =>
        track('installer_form_submitted', { installerId }),

    // CTA Events
    ctaClicked: (ctaName: string, location: string) =>
        track('cta_clicked', { ctaName, location }),
    whatsappClicked: (source: string) => track('whatsapp_clicked', { source }),

    // Directory Events
    installerViewed: (installerId: string) => track('installer_viewed', { installerId }),
    installerContactClicked: (installerId: string) =>
        track('installer_contact_clicked', { installerId }),

    // FAQ Events
    faqExpanded: (question: string) => track('faq_expanded', { question }),
}

/**
 * Get event queue (for debugging)
 */
export function getEventQueue(): AnalyticsEvent[] {
    return [...eventQueue]
}

/**
 * Clear event queue
 */
export function clearEventQueue(): void {
    eventQueue.length = 0
}
