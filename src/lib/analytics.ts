/**
 * MYSB Lightweight Analytics Dispatcher
 * Dispatches structured events to GA4 / Plausible / Meta Pixel if present,
 * and logs to console in development.
 */

type EventName =
  | 'cta_click'
  | 'whatsapp_click'
  | 'form_start'
  | 'form_field_error'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'video_play'
  | 'video_pause'
  | 'brochure_download'
  | 'poster_download'
  | 'faq_expand'
  | 'section_view';

export function trackEvent(eventName: EventName, params: Record<string, any> = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  };

  // Safe window checks
  if (typeof window !== 'undefined') {
    // 1. Google Tag Manager / GA4 dataLayer
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push(payload);
    }
    
    // 2. Plausible custom event
    if ((window as any).plausible) {
      (window as any).plausible(eventName, { props: params });
    }

    // 3. Optional Debug log
    if (import.meta.env.DEV) {
      console.log(`📊 [Analytics Event]: ${eventName}`, params);
    }
  }
}
