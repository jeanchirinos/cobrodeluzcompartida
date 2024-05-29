'use client'

import { ButtonAction } from '@/components/Button/ButtonAction'
import { deleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<{ id: string }>()

  return (
    <section className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-lg font-bold'>Eliminar grupo</h3>
        <p>El proyecto se eliminará permanentemente, incluyendo sus registros.</p>
      </div>

      <ButtonAction
        action={() => deleteRentalGroup({ id: params.id })}
        color='danger'
        className='w-fit'
      >
        Eliminar
      </ButtonAction>
    </section>
  )
}
