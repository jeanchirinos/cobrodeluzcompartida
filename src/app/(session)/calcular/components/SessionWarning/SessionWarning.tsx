import { getSession } from '@/controllers/AuthController/getSession'
import { Chip } from '@nextui-org/chip'
import { SaveButton } from './SaveButton'

export async function SessionWarning() {
  const session = await getSession()

  if (session) return <></>

  return (
    <div className='sticky top-16 z-30 w-fit bg-background'>
      <Chip color='warning' variant='flat' className='h-fit whitespace-normal p-2' radius='sm'>
        <div className='flex flex-wrap items-center gap-2.5'>
          <span>
            Estos son resultados temporales, guarda los datos e inicia sesión para no perderlos
          </span>

          <SaveButton />
        </div>
      </Chip>
    </div>
  )
}
