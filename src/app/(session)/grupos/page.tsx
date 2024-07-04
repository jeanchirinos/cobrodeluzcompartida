import { Link } from '@/components/Link'
import { getRentalGroups } from '@/controllers/RentalGroupController/getRentalGroups'
import { ROUTE } from '@/constants/routes'
import { Card, CardHeader, CardFooter } from '@nextui-org/card'
import { AvatarGroup, Avatar } from '@nextui-org/avatar'
// import { Avatar } from '@/components/Avatar'
import { Suspense } from '@/components/other/CustomSuspense'
import { CreateRentalGroup } from './components/CreateRentalGroup'
import { Tooltip } from '@nextui-org/react'
// import Image from 'next/image'

export default async function Page() {
  return (
    <main className='space-y-4 main-container'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Grupos</h1>
        <CreateRentalGroup />
      </header>
      <div className='flex flex-wrap gap-4'>
        <Suspense>
          <RentalGroups />
        </Suspense>
      </div>
    </main>
  )
}

async function RentalGroups() {
  const rentalGroups = await getRentalGroups()

  return rentalGroups.map(group => (
    <Card
      isPressable
      key={group.id}
      className='w-80 max-w-full gap-y-5 py-1'
      as={Link}
      href={ROUTE.GROUPS.REGISTERS({ id: group.id })}
    >
      <CardHeader className='flex-col items-start'>
        <p className='font-bold uppercase'>{group.name}</p>
        <small className='text-default-500'>
          {group.n_participant} {group.n_participant === 1 ? 'medidor' : 'medidores'}{' '}
          {group.n_participant === 1 ? 'activo' : 'activos'}
        </small>
      </CardHeader>
      <CardFooter className='justify-end'>
        <AvatarGroup isBordered size='sm' max={3}>
          {group.tenants.map(tenant => (
            <Tooltip
              key={tenant.id}
              content={tenant.alias}
              classNames={{
                content: 'w-max',
              }}
            >
              <Avatar
                // ImgComponent={Image}
                src={tenant.avatar_url}
                imgProps={{
                  loading: 'lazy',
                }}
                // title={p.alias}
                // imgProps={{
                //   width: 64,
                //   height: 64,
                // }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
      </CardFooter>
    </Card>
  ))
}
