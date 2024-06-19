import { ButtonAction } from '@/components/Button/ButtonAction'
import { Image } from '@/components/Image'
import { Menu, MenuContent, MenuSeparator, MenuTrigger } from '@/components/Menu'
import { ResponseGetSession } from '@/controllers/AuthController/getSession'
import { logout } from '@/controllers/AuthController/logout'

type Props = { session: ResponseGetSession }

export function UserLogged(props: Props) {
  const { session } = props

  return (
    <Menu>
      <MenuTrigger>
        <Image src={session.image_url} alt='Perfil' size={32} className='rounded-full' loading='eager' />
      </MenuTrigger>
      <MenuContent>
        <header className='flex flex-col px-4 py-2'>
          <span className='font-semibold'>{session.fullname}</span>
          <span className='text-xs'>{session.email}</span>
        </header>
        <MenuSeparator />
        <ButtonAction action={logout} variant='light' fullWidth radius='none' className='justify-start'>
          Cerrar sesión
        </ButtonAction>
      </MenuContent>
    </Menu>
  )
}
