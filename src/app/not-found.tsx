import { IconArrowBack } from '@/icons'
import { ROUTE } from '@/constants/routes'
import { ButtonLink } from '@/components/Button/ButtonLink'

export default function NotFound() {
  return (
    <main className='h-dvh flex-col gap-y-4 flex-center'>
      <h1 className='text-8xl font-bold'>404</h1>
      <p>Página no encontrada</p>

      <ButtonLink startContent={<IconArrowBack />} href={ROUTE.HOME}>
        Ir a inicio
      </ButtonLink>
    </main>
  )
}
