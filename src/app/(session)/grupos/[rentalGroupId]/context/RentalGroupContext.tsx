'use client'

import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import { type ProviderProps, createContext, useContext } from 'react'

type ContextValue = Awaited<ReturnType<typeof getRentalGroupById>>

const RentalGroupContext = createContext({} as ContextValue)

export function RentalGroupProvider(props: ProviderProps<ContextValue>) {
  return <RentalGroupContext.Provider {...props} />
}

export const useRentalGroupContext = () => useContext(RentalGroupContext)
