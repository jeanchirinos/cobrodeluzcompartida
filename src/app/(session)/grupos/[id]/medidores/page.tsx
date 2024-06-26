import { ButtonAction } from '@/components/Button/ButtonAction'
import { Suspense } from '@/components/other/CustomSuspense'
import { createParticipant } from '@/controllers/ParticipantController/createParticipant/createParticipant'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { CustomPageProps } from '@/types'
import { IconAdd, IconCrown } from '@/icons'
import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { Avatar, Card, CardFooter, CardHeader, Chip } from '@nextui-org/react'

type Props = CustomPageProps<'id'>

export default function Page(props: Props) {
  return (
    <Suspense>
      <Participants getParticipantsArgs={{ rentalGroupId: Number(props.params.id) }} />
    </Suspense>
  )
}

async function Participants(props: { getParticipantsArgs: Parameters<typeof getParticipants>[0] }) {
  const { rentalGroupId } = props.getParticipantsArgs

  const { participants } = await getParticipants({
    rentalGroupId,
  })

  return (
    <div className='flex flex-col gap-y-6'>
      <ButtonAction
        action={createParticipant}
        actionParameters={{ rental_group_id: rentalGroupId }}
        color='primary'
        className='w-fit self-end'
        endContent={<IconAdd />}
      >
        Agregar medidor
      </ButtonAction>

      <section className='flex flex-wrap gap-5'>
        {participants.map(participant => (
          <Card
            isPressable
            key={participant.id}
            className='w-80 max-w-full gap-y-5 border-default-100 py-1'
            as={Link}
            href={ROUTE.GROUPS.LIGHT_METERS.PARTICIPANTS({ groupId: rentalGroupId, id: participant.id })}
          >
            <CardHeader className='flex justify-between'>
              <p className='font-bold uppercase'>{participant.alias}</p>
              {participant.is_main && <IconCrown className='fill-yellow-500' title='Medidor de propietario' />}
            </CardHeader>
            <CardFooter className='items-end justify-between'>
              <div className='flex items-end gap-x-2.5'>
                <Avatar
                  src={participant.avatar_url}
                  alt={participant.alias}
                  size='sm'
                  imgProps={{
                    loading: 'lazy',
                  }}
                />
                <span>{participant.alias}</span>
              </div>

              {participant.is_main ? (
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
    </div>
  )
}
