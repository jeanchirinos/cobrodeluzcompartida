import { getSession } from '@/controllers/AuthController/getSession'
import { Chip } from '@nextui-org/chip'
import { SaveButton } from './SaveButton'

export async function SessionWarning() {
  const session = await getSession()

  if (session) return null

  return (
    <div className='sticky top-16 z-30 bg-background w-fit'>
      <Chip color='warning' variant='flat' className='p-2 whitespace-normal h-fit' radius='sm'>
        <div className='flex gap-2.5 flex-wrap items-center'>
          <span>
            Estos son resultados temporales, guarda los datos e inicia sesión para no perderlos
          </span>

          <SaveButton />
        </div>
      </Chip>
    </div>
  )
}
