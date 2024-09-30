'use client'

import { Chip } from '@nextui-org/chip'
import { SaveButton } from './SaveButton'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { Skeleton } from '@/components/Skeleton'

export function SessionWarning() {
  const { data, isPending } = useGetSession()

  return (
    <div className='sticky top-16 z-30 w-fit bg-background'>
      <Chip color='warning' variant='flat' className='h-fit whitespace-normal p-2' radius='sm'>
        {isPending ? (
          <Skeleton chars={90} isLoading={isPending} classNames={{ base: '!bg-warning-100' }} />
        ) : data ? (
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
