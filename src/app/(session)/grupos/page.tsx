import { Link } from '@/components/Link'
import { getRentalGroups } from '@/controllers/RentalGroupController/getRentalGroups'
import { ROUTE } from '@/routes'
import { Card, CardHeader, CardFooter } from '@nextui-org/card'
import { AvatarGroup, Avatar } from '@nextui-org/avatar'
import { ButtonAction } from '@/components/Button/ButtonAction'
import { createRentalGroup } from '@/controllers/RentalGroupController/createRentalGroup'
import { IconAdd } from '@/icons'

export default async function Page() {
  const rentalGroups = await getRentalGroups()

  return (
    <main className='main-container space-y-4'>
      <header className='flex justify-between'>
        <h1 className='font-bold text-2xl'>Grupos</h1>
        <ButtonAction color='primary' action={createRentalGroup} endContent={<IconAdd />}>
          Crear grupo
        </ButtonAction>
      </header>
      <div className='flex gap-4 flex-wrap'>
        {rentalGroups.map(group => (
          <Card
            key={group.id}
            className='py-1 w-80 max-w-full gap-y-5'
            as={Link}
            href={ROUTE.GROUPS.REGISTERS(group.id)}
          >
            <CardHeader className='flex-col items-start'>
              <p className='uppercase font-bold'>{group.name}</p>
              <small className='text-default-500'>{group.n_participant} participantes</small>
            </CardHeader>
            <CardFooter className='justify-end'>
              <AvatarGroup isBordered size='sm' max={3}>
                {group.participants.map(p => (
                  <Avatar src={p.avatar_url} key={p.id} title={p.alias} />
                ))}
              </AvatarGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
