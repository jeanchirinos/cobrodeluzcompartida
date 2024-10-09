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
  REGISTERS: {
    INDEX: ({ rentalGroupId }: { rentalGroupId: RouteId }) => `/grupos/${rentalGroupId}/registros` as const,
    ADD: ({ rentalGroupId }: { rentalGroupId: RouteId }) => `/grupos/${rentalGroupId}/registros/agregar` as const,
  },
  SETTINGS: ({ rentalGroupId }: { rentalGroupId: RouteId }) => `/grupos/${rentalGroupId}/ajustes` as const,
  PARTICIPANTS: {
    INDEX: ({ rentalGroupId }: { rentalGroupId: RouteId }) => `/grupos/${rentalGroupId}/medidores` as const,
    ID: ({ rentalGroupId, participantId }: { rentalGroupId: RouteId; participantId: RouteId }) =>
      `/grupos/${rentalGroupId}/medidores/${participantId}` as const,
    TENANTS: ({ rentalGroupId, participantId }: { rentalGroupId: RouteId; participantId: RouteId }) =>
      `/grupos/${rentalGroupId}/medidores/${participantId}/inquilinos` as const,
    SETTINGS: ({ rentalGroupId, participantId }: { rentalGroupId: RouteId; participantId: RouteId }) =>
      `/grupos/${rentalGroupId}/medidores/${participantId}/ajustes` as const,
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
