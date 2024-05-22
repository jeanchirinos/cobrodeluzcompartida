'use client'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

export type Options = {
  onSuccess?: () => void
  showSuccessToast?: boolean
  onError?: () => void
  showErrorToast?: boolean
}

export function useFormAction(action: any, options?: Options) {
  const { onSuccess, showSuccessToast = true, onError, showErrorToast = true } = options ?? {}

  // VALUES
  const initialState = { ok: null, msg: '' } as { ok: boolean | null; msg: string }

  // HOOKS
  const [actionState, formAction] = useFormState(action, initialState)

  // STATES
  const [auxActionState, setState] = useState(initialState)
  const [isPending, setIsPending] = useState(false)

  // REFS
  const actionStateChangedRef = useRef(false)

  // EFFECTS
  useEffect(() => {
    setState(actionState)
    if (actionState.ok !== null) actionStateChangedRef.current = true
  }, [actionState])

  useEffect(() => {
    const { ok, msg } = auxActionState

    if (ok === null) return

    if (!actionStateChangedRef.current) return

    actionStateChangedRef.current = false
    setIsPending(false)

    if (ok) {
      onSuccess?.()

      if (showSuccessToast) {
        toast.success(msg)
      }
    } else {
      onError?.()

      if (showErrorToast) {
        toast.error(msg)
      }
    }
  }, [auxActionState, onSuccess, showSuccessToast, onError, showErrorToast])

  return {
    state: auxActionState,
    setState,
    formAction,
    isPending,
    setIsPending,
  }
}
