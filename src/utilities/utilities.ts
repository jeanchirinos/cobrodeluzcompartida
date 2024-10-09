/** Get a URL with search params */
export function getUrlWithSearchParams<T extends Record<string, string>>(args: { hostname: string; searchParams: T }) {
  const url = getApiUrl(args.hostname)

  const searchParams = new URLSearchParams(args.searchParams).toString()
  url.search = searchParams

  return { url }
}

export function getApiUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API

  if (!baseUrl) {
    throw new Error(`No se ha definido la variable de entorno NEXT_PUBLIC_BACKEND_API`)
  }

  return new URL(url, baseUrl)
}
