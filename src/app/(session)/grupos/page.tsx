import { Link } from '@/components/Link'
import { getRentalGroups } from '@/controllers/RentalGroupController/getRentalGroups'
import { ROUTE } from '@/routes'
import { Card, CardHeader, CardFooter } from '@nextui-org/card'
import { AvatarGroup, Avatar, AvatarIcon } from '@nextui-org/avatar'

export default async function Page() {
  const rentalGroups = await getRentalGroups()

  return (
    <main className='main-container space-y-4'>
      <h1 className='font-bold text-2xl'>Grupos</h1>
      <div className='flex gap-4 flex-wrap'>
        {rentalGroups.map(group => (
          <Card
            key={group.id}
            className='py-2 w-80 max-w-full gap-y-5'
            as={Link}
            href={ROUTE.GROUPS.ID(group.id)}
          >
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <p className='uppercase font-bold'>{group.name}</p>
              <small className='text-default-500'>{group.participants} participantes</small>
            </CardHeader>
            <CardFooter className='justify-end'>
              <AvatarGroup isBordered size='sm' max={3}>
                {Array.from({ length: group.participants }).map((_, index) => (
                  <Avatar icon={<AvatarIcon />} key={index} />
                ))}
              </AvatarGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
