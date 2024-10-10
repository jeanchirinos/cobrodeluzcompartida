/** Get a URL with search params */
export function getUrlWithSearchParams<T extends Record<string, string | number | undefined>>(args: {
  hostname: string
  searchParams: T
}) {
  const { searchParams, hostname } = args

  const url = getApiUrl(hostname)

  const searchParamsParsed = Object.entries(searchParams).reduce<Record<string, string>>((acc, [key, value]) => {
    if (!value) return acc

    acc[key] = value.toString()
    return acc
  }, {})

  const newSearchParams = new URLSearchParams(searchParamsParsed).toString()
  url.search = newSearchParams

  return { url }
}

export function getApiUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API

  if (!baseUrl) {
    throw new Error(`No se ha definido la variable de entorno NEXT_PUBLIC_BACKEND_API`)
  }

  return new URL(url, baseUrl)
}
