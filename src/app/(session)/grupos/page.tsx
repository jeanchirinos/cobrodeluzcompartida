import { Link } from '@/components/Link'
import { getRentalGroups } from '@/controllers/RentalGroupController/getRentalGroups'
import { ROUTE } from '@/routes'

export default async function Page() {
  const rentalGroups = await getRentalGroups()

  return (
    <main className='main-container space-y-4'>
      <h1 className='font-bold text-2xl'>Grupos</h1>
      <div className='flex gap-4'>
        {rentalGroups.map(group => (
          <Link key={group.id} href={ROUTE.GROUPS.ID(group.id)} className='flex flex-col'>
            <h2>{group.name}</h2>
            <p>{group.participants}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
