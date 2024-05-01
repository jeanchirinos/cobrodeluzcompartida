const ROOT = {
  HOME: '/',
  CALCULATE: '/calcular',
} as const

const AUTH = {
  SOCIAL_AUTH: '/social_auth',
} as const

const GROUPS = {
  INDEX: '/grupos',
  ID: (id: string | number) => `/grupos/${id}` as const,
} as const

export const ROUTE = {
  ...ROOT,
  AUTH,
  GROUPS,
}
