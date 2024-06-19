import { ButtonAction } from '@/components/Button/ButtonAction'
import { Image } from '@/components/Image'
import { Suspense } from '@/components/other/CustomSuspense'
import { createParticipant } from '@/controllers/ParticipantController/createParticipant/createParticipant'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { CustomPageProps } from '@/types'
import { UpdateParticipant } from './components/UpdateParticipant'
import { IconCrown } from '@/icons'
import { deleteParticipant } from '@/controllers/ParticipantController/deleteParticipant'

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
      >
        Agregar participante
      </ButtonAction>
      <ul className='flex flex-wrap gap-5'>
        {participants.map(participant => (
          <li key={participant.id} className='flex flex-col items-center gap-y-2'>
            <Image src={participant.avatar_url} alt={participant.alias} size={250} />
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
