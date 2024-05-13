import { Image } from '@/components/Image'
import { Menu, MenuContent, MenuTrigger } from '@/components/Menu'
import { SubmitButton } from '@/components/SubmitButton'
import { SessionLogged } from '@/controllers/AuthController/getSession'
import { logout } from '@/controllers/AuthController/logout'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  return (
    <div className='flex items-center gap-x-4'>
      <Menu>
        <MenuTrigger className='flex items-center'>
          <Image
            src={session.image_url}
            alt='Perfil'
            width={32}
            height={32}
            className='rounded-full'
            loading='eager'
          />
        </MenuTrigger>
        <MenuContent className='right-0'>
          <div className='flex flex-col border-b border-content2 px-4 py-2'>
            <span className='font-semibold'>{session.fullname}</span>
            <span className='text-xs'>{session.email}</span>
          </div>
          <div className='flex flex-col any-*-[a]:w-full any-*-[a]:px-4 any-*-[a]:py-2' />

          <form action={logout}>
            <SubmitButton className='w-full justify-start rounded-none bg-transparent text-inherit hover:bg-foreground-100'>
              Cerrar sesión
            </SubmitButton>
          </form>
        </MenuContent>
      </Menu>
    </div>
  )
}
