'use client'

import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { Avatar, AvatarGroup } from '@nextui-org/avatar'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { useGetRentalGroups } from '@/controllers/RentalGroupController/getRentalGroups/useGetRentalGroups'
import { SuspenseFallback } from '@/components/other/SuspenseFallback'

export function RentalGroups() {
  const { data,isError, isPending } = useGetRentalGroups()

  if (isPending) return <SuspenseFallback />
  if (isError) return <p>Error</p>

  const { rentalGroups } = data


    return rentalGroups.map(group => (
      <Card
        isPressable
        key={group.id}
        className='w-80 max-w-full gap-y-5 py-1'
        as={Link}
        href={ROUTE.GROUPS.REGISTERS.INDEX({ id: group.id })}
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
                  ImgComponent={Image}
                  src={tenant.avatar_url}
                  imgProps={{
                    width: 64,
                    height: 64,
                  }}
                  title={tenant.alias}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </CardFooter>
      </Card>
    ))
}
