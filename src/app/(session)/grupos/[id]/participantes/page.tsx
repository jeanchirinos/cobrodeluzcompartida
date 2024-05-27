import { Suspense } from '@/components/other/CustomSuspense'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { PageProps } from '@/types'

type Props = PageProps<'id'>

export default function Page(props: Props) {
  return (
    <>
      <p>Participantes</p>
      <Suspense>
        <Participants getParticipantsArgs={{ rentalGroupId: props.params.id }} />
      </Suspense>
    </>
  )
}

async function Participants(props: { getParticipantsArgs: Parameters<typeof getParticipants>[0] }) {
  const { participants } = await getParticipants({
    rentalGroupId: props.getParticipantsArgs.rentalGroupId,
  })

  return (
    <ul>
      {participants.map(participant => (
        <li key={participant.id}>
          <p>{participant.alias}</p>
          <img src={participant.avatar_url} alt={participant.alias} />
        </li>
      ))}
    </ul>
  )
}
