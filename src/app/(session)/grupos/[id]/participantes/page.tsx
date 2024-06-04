import { Image } from '@/components/Image'
import { Suspense } from '@/components/other/CustomSuspense'
import { getParticipants } from '@/controllers/ParticipantController/getParticipants'
import { CustomPageProps } from '@/types'

type Props = CustomPageProps<'id'>

export default function Page(props: Props) {
  return (
    <>
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
    <ul className='flex gap-5'>
      {participants.map(participant => (
        <li key={participant.id} className='flex flex-col gap-y-2 items-center'>
          <Image src={participant.avatar_url} alt={participant.alias} width={250} height={250} />
          <p>{participant.alias}</p>
        </li>
      ))}
    </ul>
  )
}
