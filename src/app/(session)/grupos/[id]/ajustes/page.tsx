import { DeleteGroup } from './components/DeleteGroup'
import { UpdateGroup } from './components/UpdateGroup'

export default async function Page() {
  return (
    <main className='flex flex-col gap-y-12 !px-0 main-container'>
      <UpdateGroup />
      <DeleteGroup />
    </main>
  )
}
