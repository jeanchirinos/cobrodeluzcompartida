import { getApiUrl } from './request/env-variables/get'

/** Get a URL with search params */
export function getUrlWithSearchParams<T extends Record<string, string>>(args: { hostname: string; searchParams: T }) {
  const url = getApiUrl(args.hostname)

  const searchParams = new URLSearchParams(args.searchParams).toString()
  url.search = searchParams

  return { url }
}
