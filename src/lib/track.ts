// Analytics placeholder. Wire to GTM/GA4 by pushing to window.dataLayer once the snippet is in index.html.
declare global {
  interface Window { dataLayer?: unknown[] }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event, ...params });
}
