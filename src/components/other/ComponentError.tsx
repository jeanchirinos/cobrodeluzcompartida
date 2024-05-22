'use client'

import { ErrorComponent } from 'next/dist/client/components/error-boundary'

export function ErrorUiComponent(props: React.ComponentProps<ErrorComponent>) {
  return <p title={props.error.message}>Hubo un error</p>
}
