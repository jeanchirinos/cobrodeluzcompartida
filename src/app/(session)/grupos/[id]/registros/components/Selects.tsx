'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'

export function Selects() {
  // HOOKS
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('year', value)

    replace('?' + newSearchParams.toString())
  }

  return (
    <>
      <div className='flex w-full'>
        <Select
          name='year'
          onChange={handleChange}
          classNames={{ base: 'w-60' }}
          placeholder=' '
          label='Año'
          labelPlacement='outside'
          selectedKeys={[searchParams.get('year') ?? '']}
        >
          <SelectItem key='2024'>2024</SelectItem>
          <SelectItem key='2023'>2023</SelectItem>
        </Select>
      </div>
    </>
  )
}
