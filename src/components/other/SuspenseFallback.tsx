import { Spinner } from '@nextui-org/react'

export function SuspenseFallback() {
  return (
    <div className='flex h-36 w-full items-end justify-center'>
      <Spinner />
    </div>
  )
}
