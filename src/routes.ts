import { RouteId } from './types'

const ROOT = {
  HOME: '/',
  CALCULATE: '/calcular',
} as const

const AUTH = {
  SOCIAL_AUTH: '/social_auth',
} as const

const GROUPS = {
  INDEX: '/grupos',
  REGISTERS: (id: RouteId) => `/grupos/${id}/registros` as const,
  PARTICIPANTS: (id: RouteId) => `/grupos/${id}/participantes` as const,
  SETTINGS: {
    GENERAL: (id: RouteId) => `/grupos/${id}/ajustes/general` as const,
  },
} as const

export const ROUTE = {
  ...ROOT,
  AUTH,
  GROUPS,
}
