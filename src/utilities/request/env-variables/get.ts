export function getApiUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API

  if (!baseUrl) {
    throw new Error(`No se ha definido la variable de entorno NEXT_PUBLIC_BACKEND_API`)
  }

  return new URL(url, baseUrl)
}

export function getApiKey() {
  const apiKey = process.env.API_KEY

  if (!apiKey) {
    throw new Error(`No se ha definido la variable de entorno API_KEY`)
  }

  return apiKey
}
