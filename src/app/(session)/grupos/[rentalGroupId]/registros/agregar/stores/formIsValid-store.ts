import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { FieldErrors } from 'react-hook-form'
import { create } from 'zustand'

type Store = {
  isValid: boolean
  setIsValid: (isValid: boolean) => void
  customErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>>
  setCustomErrors: (customErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>>) => void
}

export const useFormIsValidStore = create<Store>()(set => ({
  isValid: false,
  setIsValid: (isValid: boolean) => set({ isValid }),
  customErrors: [],
  setCustomErrors: (customErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>>) =>
    set({ customErrors }),
}))
