// import { getSession } from '@/controllers/UserController/getSession'
import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged/UserNotLogged'

export async function Session() {
//   const session = await getSession()
    const session = null

  return session ? <UserLogged session={session} /> : <UserNotLogged />
}