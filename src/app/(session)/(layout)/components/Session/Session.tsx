import { getSession } from '@/controllers/AuthController/getSession'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged/UserNotLogged'

export async function Session() {
  const { session } = await getSession()

  return session ? <UserLogged session={session} /> : <UserNotLogged />
}
