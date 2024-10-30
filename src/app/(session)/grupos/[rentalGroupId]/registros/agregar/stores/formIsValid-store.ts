import { SchemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { FieldErrors } from 'react-hook-form'
import { create } from 'zustand'

type Store = {
  isValid: {
    form: boolean
    custom: boolean
    all: boolean
  }
  setIsValid: (
    isValid: Partial<{
      form: boolean
      custom: boolean
      all: boolean
    }>,
  ) => void
  customErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>>
  setCustomErrors: (customErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>>) => void
}

export const useFormIsValidStore = create<Store>()(set => ({
  isValid: {
    form: false,
    custom: false,
    all: false,
  },
  setIsValid: (isValid: Partial<{ form: boolean; custom: boolean }>) =>
    set(state => {
      const newIsValid = {
        ...state.isValid,
        ...isValid,
      }

      const all = Boolean(newIsValid.form && newIsValid.custom)

      return {
        isValid: {
          ...newIsValid,
          all,
        },
      }
    }),
  customErrors: [],
  setCustomErrors: (customErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>>) =>
    set({ customErrors }),
}))
