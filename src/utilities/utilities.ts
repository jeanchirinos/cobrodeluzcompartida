import { getApiUrl } from './request/env-variables/get'

/** Simulate a delay for async operations */
export async function waitFor(seconds: number) {
  return await new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

/** Get the entries of a FormData object */
export function getFormEntries(formData: FormData) {
  return Object.fromEntries(formData.entries())
}

/** Get a URL with search params */
export function getUrlWithSearchParams<T extends Record<string, string>>(args: {
  hostname: Parameters<typeof getApiUrl>[0]
  searchParams: T
}) {
  const searchParams = new URLSearchParams(args.searchParams).toString()

  const url = getApiUrl(args.hostname)
  url.search = searchParams

  return { url }
}
