/**
 * Deep linking utilities for Capacitor native auth redirects.
 * Custom URL scheme: app.lovable.26daf65450674d53941c0042836b48f8://
 */

const CUSTOM_SCHEME = "app.lovable.26daf65450674d53941c0042836b48f8";
const WEB_ORIGIN = window.location.origin;

/**
 * Returns the appropriate redirect URL for auth flows.
 * On native (Capacitor), uses custom scheme; on web, uses window.location.origin.
 */
export function getAuthRedirectUrl(path = ""): string {
  const isNative =
    typeof (window as any).Capacitor !== "undefined" &&
    (window as any).Capacitor.isNativePlatform?.();

  if (isNative) {
    return `${CUSTOM_SCHEME}://${path}`;
  }
  return `${WEB_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
