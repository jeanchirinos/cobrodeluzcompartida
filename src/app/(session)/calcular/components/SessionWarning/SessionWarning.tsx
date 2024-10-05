'use client'

import { Chip } from '@nextui-org/chip'
import { SaveButton } from './SaveButton'
import { useGetSession } from '@/controllers/AuthController/getSession/useGetSession'
import { Skeleton } from '@/components/Skeleton'
import { ErrorUi } from '@/components/other/ComponentError'
import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'

type Props = {
  results: ResultRow[]
}

export function SessionWarning(props: Props) {
  const { results } = props

  const { isPending, error } = useGetSession()

  const content = () => {
    if (isPending) return <></>

    if (error) {
      if (error.status === 401) {
        return (
          <div className='flex flex-wrap items-center gap-2.5'>
            <span>Estos resultados serán temporales, guarda los datos e inicia sesión para no perderlos</span>
            <SaveButton results={results} />
          </div>
        )
      } else {
        return <ErrorUi />
      }
    }

    return <span>Estos resultados serán temporales, se recomienda guardar los datos en un grupo de consumo</span>
  }

  return (
    <div className='sticky top-16 z-30 w-fit bg-background'>
      <Chip color='warning' variant='flat' className='h-fit whitespace-normal p-2' radius='sm'>
        <Skeleton chars={90} isLoading={isPending} className='!bg-warning-100'>
          {content()}
        </Skeleton>
      </Chip>
    </div>
  )
}
