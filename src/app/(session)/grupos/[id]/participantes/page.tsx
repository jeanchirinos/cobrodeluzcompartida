import { ButtonAction } from '@/components/Button/ButtonAction'
import { Image } from '@/components/Image'
import { Suspense } from '@/components/other/CustomSuspense'
import { createParticipant } from '@/controllers/ParticipantController/createParticipant/createParticipant'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { CustomPageProps } from '@/types'

type Props = CustomPageProps<'id'>

export default function Page(props: Props) {
  return (
    <Suspense>
      <Participants getParticipantsArgs={{ rentalGroupId: props.params.id }} />
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
      <ul className='flex gap-5 flex-wrap'>
        {participants.map(participant => (
          <li key={participant.id} className='flex flex-col gap-y-2 items-center'>
            <Image src={participant.avatar_url} alt={participant.alias} width={250} height={250} />
            <p>{participant.alias}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
