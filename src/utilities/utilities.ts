import { ROUTE } from '@/routes'
import { redirect } from 'next/navigation'
import { getApiUrl } from './request'

/** Simulate a delay for async operations */
export async function waitFor(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export function getFormEntries(formData: FormData) {
  return Object.fromEntries(formData.entries())
}

export function redirectAfterUnauthorized() {
  return redirect(ROUTE.HOME)
}

export function getUrlWithSearchParams<T extends Record<string, string>>(args: {
  hostname: Parameters<typeof getApiUrl>[0]
  searchParams: T
}) {
  const searchParams = new URLSearchParams(args.searchParams).toString()

  const url = getApiUrl(args.hostname)
  url.search = searchParams

  return { url }
}
