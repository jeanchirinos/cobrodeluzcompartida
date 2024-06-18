import { AuthSuccess } from './components/auth-success'
import { AlreadyLinked } from './components/already-linked'
import { User } from '@/models/User'

type Props = {
  searchParams: (Pick<User, 'token'> & { status: 'success' }) | { status: 'error' }
}

export default function Page(props: Props) {
  const { searchParams } = props
  const { status } = searchParams

  return (
    <main className='min-h-dvh flex-col gap-y-6 px-2 text-center flex-center'>
      {status === 'success' ? <AuthSuccess token={searchParams.token} /> : <AlreadyLinked />}
    </main>
  )
}
