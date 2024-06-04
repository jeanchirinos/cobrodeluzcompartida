import { DeleteGroup } from './components/DeleteGroup'
import { UpdateGroup } from './components/UpdateGroup'

export default async function Page() {
  return (
    <div className='flex flex-col gap-y-12'>
      <UpdateGroup />
      <DeleteGroup />
    </div>
  )
}
