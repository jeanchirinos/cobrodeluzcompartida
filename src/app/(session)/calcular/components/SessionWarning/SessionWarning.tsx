'use client'

import { Chip } from '@nextui-org/chip'
import { SaveButton } from './SaveButton'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'

export function SessionWarning() {
  const { data, isLoading } = useGetSession()

  const { session } = data ?? {}

  if (isLoading) return null

  return (
    <div className='sticky top-16 z-30 w-fit bg-background'>
      <Chip color='warning' variant='flat' className='h-fit whitespace-normal p-2' radius='sm'>
        {session ? (
          <span>Estos resultados serán temporales, se recomienda guardar los datos en un grupo de consumo</span>
        ) : (
          <div className='flex flex-wrap items-center gap-2.5'>
            <span>Estos resultados serán temporales, guarda los datos e inicia sesión para no perderlos</span>
            <SaveButton />
          </div>
        )}
      </Chip>
    </div>
  )
}
