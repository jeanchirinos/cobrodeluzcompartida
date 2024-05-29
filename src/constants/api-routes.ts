import { RouteId } from '@/types'

const INDEX_API_ROUTE = (base: string) => base
const SHOW_API_ROUTE = (base: string) => (id: RouteId) => `${base}/${id}` as const
const STORE_API_ROUTE = (base: string) => `${base}/store`
const UPDATE_API_ROUTE = (base: string) => (id: RouteId) => `${base}/${id}/update` as const
const DESTROY_API_ROUTE = (base: string) => (id: RouteId) => `${base}/${id}/destroy` as const

//* AUTH

const AUTH = {
  LOGIN: 'login',
  SESSION: 'session',
  LOGOUT: 'logout',
}

//* RENTAL GROUP

const RENTAL_GROUP_BASE = 'rental-group'

const RENTAL_GROUP = {
  INDEX: INDEX_API_ROUTE(RENTAL_GROUP_BASE),
  SHOW: SHOW_API_ROUTE(RENTAL_GROUP_BASE),
  STORE: STORE_API_ROUTE(RENTAL_GROUP_BASE),
  UPDATE: UPDATE_API_ROUTE(RENTAL_GROUP_BASE),
  DESTROY: DESTROY_API_ROUTE(RENTAL_GROUP_BASE),
}

//* PARTICIPANT

const PARTICIPANT_BASE = 'participant'

const PARTICIPANT = {
  INDEX: (id: RouteId) => `${INDEX_API_ROUTE(PARTICIPANT_BASE)}/rental_group_id/${id}`,
  SHOW: SHOW_API_ROUTE(PARTICIPANT_BASE),
  STORE: STORE_API_ROUTE(PARTICIPANT_BASE),
  UPDATE: UPDATE_API_ROUTE(PARTICIPANT_BASE),
  DESTROY: DESTROY_API_ROUTE(PARTICIPANT_BASE),
}

// EXPORT

export const API_ROUTE = {
  AUTH,
  RENTAL_GROUP,
  PARTICIPANT,
}
