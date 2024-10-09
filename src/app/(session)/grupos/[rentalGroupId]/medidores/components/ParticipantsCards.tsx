'use client'
import { IconCrown } from '@/icons'
import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { Avatar, Card, CardFooter, CardHeader, Chip } from '@nextui-org/react'
import { SuspenseFallback } from '@/components/other/SuspenseFallback'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import Image from 'next/image'
import { ErrorUi } from '@/components/other/ComponentError'

export function ParticipantsCards() {
  const { data, isPending, isError } = useGetParticipants()

  if (isPending) return <SuspenseFallback />
  if (isError) return <ErrorUi />

  const { participants } = data

  return (
    <section className='flex flex-wrap gap-5'>
      {participants.map(participant => (
        <Card
          key={participant.id}
          as={Link}
          isPressable
          className='w-80 max-w-full gap-y-5 border-default-100 py-1'
          href={ROUTE.GROUPS.PARTICIPANTS.TENANTS({
            rentalGroupId: participant.rental_group_id,
            participantId: participant.id,
          })}
        >
          <CardHeader className='flex justify-between'>
            <p className='font-bold uppercase'>{participant.alias}</p>
            {participant.is_main && <IconCrown className='fill-yellow-500' title='Medidor de propietario' />}
          </CardHeader>
          <CardFooter className='items-end justify-between'>
            <div className='flex items-end gap-x-2.5'>
              <Avatar
                ImgComponent={Image}
                src={participant.tenant.avatar_url}
                alt={participant.tenant.alias}
                size='sm'
                imgProps={{
                  width: 64,
                  height: 64,
                }}
              />
              <span>{participant.tenant.alias}</span>
            </div>

            {participant.active ? (
              <Chip variant='dot' color='success'>
                Activo
              </Chip>
            ) : (
              <Chip variant='dot'>Inactivo</Chip>
            )}
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
