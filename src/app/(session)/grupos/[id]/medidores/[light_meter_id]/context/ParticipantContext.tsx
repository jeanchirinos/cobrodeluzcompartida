'use client'

import { getParticipantById } from '@/controllers/ParticipantController/getParticipantById'
import { type ProviderProps, createContext, useContext } from 'react'

type ContextValue = Awaited<ReturnType<typeof getParticipantById>>

const ParticipantContext = createContext({} as ContextValue)

export function ParticipantProvider(props: ProviderProps<ContextValue>) {
  return <ParticipantContext.Provider {...props} />
}

export const useParticipantContext = () => useContext(ParticipantContext)
