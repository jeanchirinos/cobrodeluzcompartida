import { ButtonAction } from '@/components/Button/ButtonAction'
import { Image } from '@/components/Image'
import { Suspense } from '@/components/other/CustomSuspense'
import { createParticipant } from '@/controllers/ParticipantController/createParticipant/createParticipant'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { CustomPageProps } from '@/types'
import { UpdateParticipant } from './components/UpdateParticipant'
import { IconAdd, IconCrown } from '@/icons'
import { deleteParticipant } from '@/controllers/ParticipantController/deleteParticipant'
import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'

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
        className='w-fit'
        endContent={<IconAdd />}
      >
        Agregar medidor
      </ButtonAction>
      <ul className='flex flex-wrap gap-5'>
        {participants.map(participant => (
          <li key={participant.id} className='flex flex-col items-center gap-y-2'>
            <Link href={ROUTE.GROUPS.LIGHT_METERS.PARTICIPANTS({ groupId: rentalGroupId, id: participant.id })}>
              <Image src={participant.avatar_url} alt={participant.alias} size={250} />
            </Link>
            <div className='flex items-center gap-x-1.5'>
              {participant.is_main && <IconCrown className='fill-yellow-500' />}
              <p>{participant.alias}</p>
            </div>
            <footer className='flex gap-x-2'>
              <UpdateParticipant participant={participant} />
              <ButtonAction
                color='danger'
                action={deleteParticipant}
                actionParameters={{ id: participant.id, rentalGroupId }}
                variant='flat'
              >
                Remover
              </ButtonAction>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  )
}
