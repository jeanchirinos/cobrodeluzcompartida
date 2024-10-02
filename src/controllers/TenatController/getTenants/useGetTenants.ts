'use client'

import { Participant } from '@/models/Participant'
import { useParams } from 'next/navigation'
import { getTenants } from './getTenants'
import { useQuery } from '@tanstack/react-query'

export const SWR_KEY_GET_TENANTS = (id: Participant['id']) => `GET_TENANTS_${id}`

export function useGetTenants() {
  const params = useParams()
  const { participantId } = params as { participantId: string }

  const fetcher = () => getTenants({ participantId: Number(participantId) })

  return useQuery({ queryKey: [SWR_KEY_GET_TENANTS(Number(participantId))], queryFn: fetcher })
}
