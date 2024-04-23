import { getSession } from '@/controllers/AuthController/getSession'
import { IconWarning } from '@/icons'
import { Chip } from '@nextui-org/chip'
import { SaveButton } from './SaveButton'

export async function SessionWarning() {
  const session = await getSession()

  if (session) return null

  return (
    <Chip color='warning' variant='flat' startContent={<IconWarning />} className='py-5 px-2'>
      <div className='flex gap-x-2.5 items-center'>
        <span>
          Estos son resultados temporales, guarda los datos e inicia sesión para no perderlos
        </span>

        <SaveButton />
      </div>
    </Chip>
  )
}
