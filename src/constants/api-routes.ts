import { RouteId } from '@/types'

const INDEX_API_ROUTE = ({ base }: { base: string }) => base

const SHOW_API_ROUTE =
  ({ base }: { base: string }) =>
  ({ id }: { id: RouteId }) =>
    `${base}/${id}` as const

const STORE_API_ROUTE = ({ base }: { base: string }) => `${base}/store`

const UPDATE_API_ROUTE =
  ({ base }: { base: string }) =>
  ({ id }: { id: RouteId }) =>
    `${base}/${id}/update` as const

const DESTROY_API_ROUTE =
  ({ base }: { base: string }) =>
  ({ id }: { id: RouteId }) =>
    `${base}/${id}/destroy` as const

//* AUTH

const AUTH = {
  LOGIN: 'login',
  SESSION: 'session',
  LOGOUT: 'logout',
  GOOGLE_REDIRECT: 'auth/google/redirect',
}

//* RENTAL GROUP

const RENTAL_GROUP_BASE = 'rental-group'

const RENTAL_GROUP = {
  INDEX: INDEX_API_ROUTE({ base: RENTAL_GROUP_BASE }),
  SHOW: SHOW_API_ROUTE({ base: RENTAL_GROUP_BASE }),
  STORE: STORE_API_ROUTE({ base: RENTAL_GROUP_BASE }),
  UPDATE: UPDATE_API_ROUTE({ base: RENTAL_GROUP_BASE }),
  DESTROY: DESTROY_API_ROUTE({ base: RENTAL_GROUP_BASE }),
}

//* PARTICIPANT

const PARTICIPANT_BASE = 'participant'

const PARTICIPANT = {
  INDEX: ({ rentalGroupId }: { rentalGroupId: RouteId }) =>
    `${INDEX_API_ROUTE({ base: PARTICIPANT_BASE })}/rental_group_id/${rentalGroupId}`,
  SHOW: SHOW_API_ROUTE({ base: PARTICIPANT_BASE }),
  STORE: STORE_API_ROUTE({ base: PARTICIPANT_BASE }),
  UPDATE: UPDATE_API_ROUTE({ base: PARTICIPANT_BASE }),
  DESTROY: DESTROY_API_ROUTE({ base: PARTICIPANT_BASE }),
}

//* RENTAL GROUP REGISTER

const RENTAL_GROUP_REGISTER_BASE = 'rental-group-register'

const RENTAL_GROUP_REGISTER = {
  INDEX: INDEX_API_ROUTE({ base: RENTAL_GROUP_REGISTER_BASE }),
  SHOW: SHOW_API_ROUTE({ base: RENTAL_GROUP_REGISTER_BASE }),
  STORE: STORE_API_ROUTE({ base: RENTAL_GROUP_REGISTER_BASE }),
  UPDATE: UPDATE_API_ROUTE({ base: RENTAL_GROUP_REGISTER_BASE }),
  DESTROY: DESTROY_API_ROUTE({ base: RENTAL_GROUP_REGISTER_BASE }),
}

// EXPORT

export const API_ROUTE = {
  AUTH,
  RENTAL_GROUP,
  PARTICIPANT,
  RENTAL_GROUP_REGISTER,
}
