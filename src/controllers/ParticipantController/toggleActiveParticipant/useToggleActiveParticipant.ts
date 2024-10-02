'use client'

import { useMutation } from '@tanstack/react-query'
import { toggleActiveParticipant } from './toggleActiveParticipant'

export function useToggleActiveParticipant() {
  return useMutation({ mutationFn: toggleActiveParticipant })
}
