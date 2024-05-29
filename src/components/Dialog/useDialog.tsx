'use client'

import { useState } from 'react'

// HOOK
export function useDialog() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return { isOpen, open, close }
}

export type UseDialog = ReturnType<typeof useDialog>
