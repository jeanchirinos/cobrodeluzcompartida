import { RouteId } from '@/types'

const ROOT = {
  HOME: '/',
  CALCULATE: '/calcular',
} as const

const AUTH = {
  SOCIAL_AUTH: '/social_auth',
} as const

const GROUPS = {
  INDEX: '/grupos',
  REGISTERS: ({ id }: { id: RouteId }) => `/grupos/${id}/registros` as const,
  SETTINGS: ({ id }: { id: RouteId }) => `/grupos/${id}/ajustes` as const,
  LIGHT_METERS: {
    INDEX: ({ groupId }: { groupId: RouteId }) => `/grupos/${groupId}/medidores` as const,
    ID: ({ groupId, id }: { groupId: RouteId; id: RouteId }) => `/grupos/${groupId}/medidores/${id}` as const,
    TENANTS: ({ groupId, id }: { groupId: RouteId; id: RouteId }) =>
      `/grupos/${groupId}/medidores/${id}/arrendatarios` as const,
    SETTINGS: ({ groupId, id }: { groupId: RouteId; id: RouteId }) =>
      `/grupos/${groupId}/medidores/${id}/ajustes` as const,
  },
} as const

const TENANT = {
  SHARE: ({ tenantId, key }: { tenantId: RouteId; key: RouteId }) => `/compartir/${tenantId}/${key}` as const,
}

export const ROUTE = {
  ...ROOT,
  AUTH,
  GROUPS,
  TENANT,
}
