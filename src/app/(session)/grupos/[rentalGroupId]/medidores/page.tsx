import { ButtonAction } from '@/components/Button/ButtonAction'
import { createParticipant } from '@/controllers/ParticipantController/createParticipant/createParticipant'
import { IconAdd } from '@/icons'
import { CustomPageProps } from '@/types'
import { Metadata } from 'next'
import { ParticipantsCards } from './components/ParticipantsCards'

export const metadata: Metadata = {
  title: 'Medidores',
}

type Props = CustomPageProps<'rentalGroupId'>

export default function Page(props: Props) {
  const { rentalGroupId } = props.params

  return (
    <div className='flex flex-col gap-y-6'>
      <ButtonAction
        action={createParticipant}
        actionParameters={{ rental_group_id: Number(rentalGroupId) }}
        color='primary'
        className='w-fit self-end'
        endContent={<IconAdd />}
      >
        Agregar medidor
      </ButtonAction>

      <ParticipantsCards />
    </div>
  )
}
