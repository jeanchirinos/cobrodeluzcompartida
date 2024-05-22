//* RENTAL GROUP

const RENTAL_GROUP_BASE = 'rental-group'

const RENTAL_GROUP = {
  INDEX: RENTAL_GROUP_BASE,
  SHOW: (id: string | number) => `${RENTAL_GROUP_BASE}/${id}`,
  STORE: `${RENTAL_GROUP_BASE}/store`,
  UPDATE: (id: string | number) => `${RENTAL_GROUP_BASE}/${id}/update`,
  DESTROY: (id: string | number) => `${RENTAL_GROUP_BASE}/${id}/destroy`,
}

//* PARTICIPANT

const PARTICIPANT_BASE = 'participant'

const PARTICIPANT = {
  INDEX: PARTICIPANT_BASE,
  SHOW: (id: string | number) => `${PARTICIPANT_BASE}/${id}`,
  STORE: `${PARTICIPANT_BASE}/store`,
  UPDATE: (id: string | number) => `${PARTICIPANT_BASE}/${id}/update`,
  DESTROY: (id: string | number) => `${PARTICIPANT_BASE}/${id}/destroy`,
}

export const API_ROUTE = {
  RENTAL_GROUP,
  PARTICIPANT,
}
