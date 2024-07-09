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
  PARTICIPANTS: {
    INDEX: ({ rentalGroupId }: { rentalGroupId: RouteId }) => `/grupos/${rentalGroupId}/medidores` as const,
    ID: ({ rentalGroupId, id }: { rentalGroupId: RouteId; id: RouteId }) =>
      `/grupos/${rentalGroupId}/medidores/${id}` as const,
    TENANTS: ({ rentalGroupId, id }: { rentalGroupId: RouteId; id: RouteId }) =>
      `/grupos/${rentalGroupId}/medidores/${id}/inquilinos` as const,
    SETTINGS: ({ rentalGroupId, id }: { rentalGroupId: RouteId; id: RouteId }) =>
      `/grupos/${rentalGroupId}/medidores/${id}/ajustes` as const,
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
