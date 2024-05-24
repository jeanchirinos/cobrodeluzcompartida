const ROOT = {
  HOME: '/',
  CALCULATE: '/calcular',
} as const

const AUTH = {
  SOCIAL_AUTH: '/social_auth',
} as const

const GROUPS = {
  INDEX: '/grupos',
  REGISTERS: (id: string | number) => `/grupos/${id}/registros` as const,
  PARTICIPANTS: (id: string | number) => `/grupos/${id}/participantes` as const,
  SETTINGS: {
    GENERAL: (id: string | number) => `/grupos/${id}/ajustes/general` as const,
  },
} as const

export const ROUTE = {
  ...ROOT,
  AUTH,
  GROUPS,
}
