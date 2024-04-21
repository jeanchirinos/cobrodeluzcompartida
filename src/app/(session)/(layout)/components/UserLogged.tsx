import { Menu, MenuContent, MenuTrigger } from '@/components/Menu'
import { SessionLogged } from '@/controllers/AuthController/getSession'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  console.log({ session })

  return (
    <div className='flex items-center gap-x-4'>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Menu>
        <MenuTrigger className='flex items-center'>
          {/* <Image
            src={session.image}
            alt='Perfil'
            width={32}
            height={32}
            className='rounded-full'
            loading='eager'
          /> */}
        </MenuTrigger>
        <MenuContent className='right-0'>
          <div className='flex flex-col border-b border-content2 px-4 py-2'>
            <span className='font-semibold'>{session.fullname}</span>
            <span className='text-xs'>{session.email}</span>
          </div>
          <div className='flex flex-col any-*-[a]:w-full any-*-[a]:px-4 any-*-[a]:py-2' />
        </MenuContent>
      </Menu>
    </div>
  )
}
