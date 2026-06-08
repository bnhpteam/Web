import i18next from './i18next'
import { headerName } from './settings'
import { headers } from 'next/headers'

export async function getT(ns, options) {
  let lng = null
  try {
    const headerList = await headers()
    lng = headerList.get(headerName)
  } catch (e) {
    // Catch errors during build/prerender phase when headers() is not available
    lng = null
  }

  if (lng && i18next.resolvedLanguage !== lng) {
    try {
      await i18next.changeLanguage(lng)
    } catch (e) {
      console.warn("Failed to change language during build:", e)
    }
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    try {
      await i18next.loadNamespaces(ns)
    } catch (e) {
      console.warn("Failed to load namespace during build:", e)
    }
  }
  return {
    t: i18next.getFixedT(lng ?? i18next.resolvedLanguage ?? 'en', Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix),
    i18n: i18next
  }
}
