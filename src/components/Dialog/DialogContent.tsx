'use client'

import { useEffect, useRef, type PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ isOpen: boolean; onExitComplete?: () => void }>

export function DialogContent(props: Props) {
  const { isOpen, onExitComplete } = props

  const alreadyExited = useRef(false)

  useEffect(() => {
    if (!isOpen && !alreadyExited.current) {
      onExitComplete?.()
      alreadyExited.current = true
    }
  }, [onExitComplete, isOpen])

  return props.children
}
