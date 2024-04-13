const ROOT = {
  HOME: '/',
  CALCULATE: '/calcular',
} as const

const AUTH = {
  PASSWORD_FORGOT: (email?: string) => `/recuperar${email ? '?email=' + email : ''}` as const,
  // API use this two routes
  PASSWORD_RESET: '/recuperar_api',
  SOCIAL_AUTH: '/social_auth',
} as const

export const ROUTE = {
  ...ROOT,
  AUTH,
}
