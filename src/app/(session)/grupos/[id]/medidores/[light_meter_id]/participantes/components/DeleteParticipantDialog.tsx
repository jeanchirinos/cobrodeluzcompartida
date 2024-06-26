'use client'

import { Dialog, DialogBody, DialogFooter } from '@/components/Dialog/Dialog'
import { UseDialog } from '@/components/Dialog/useDialog'
import { deleteRentalGroup } from '@/controllers/RentalGroupController/deleteRentalGroup'
import { useParams, useRouter } from 'next/navigation'
import { handleResponse } from '@/utilities/handleResponse'
import { ROUTE } from '@/constants/routes'
import { useRentalGroupContext } from '@/app/(session)/grupos/[id]/context/RentalGroupContext'

export function DeleteParticipantDialog(props: { deleteRentalGroupDialog: UseDialog }) {
  const { deleteRentalGroupDialog } = props
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()

  const { rentalGroup } = useRentalGroupContext()

  async function customHandleClick() {
    const res = await deleteRentalGroup({ id: Number(id) })

    handleResponse({
      res,
      onSuccess() {
        push(ROUTE.GROUPS.INDEX)
      },
    })
  }

  // RENDER
  return (
    <Dialog dialog={deleteRentalGroupDialog} dialogTitle='Eliminar participante'>
      <DialogBody>
        <p>
          El participante <b>{rentalGroup.name}</b> y los datos relacionados se eliminarán permanentemente
        </p>
        <p className='mt-2'>¿ Estás seguro de que quieres eliminar el participante ?</p>
      </DialogBody>
      <DialogFooter
        dialog={deleteRentalGroupDialog}
        variant='2'
        customHandleClick={customHandleClick}
        mainButtonProps={{
          color: 'danger',
          children: 'Sí, Eliminar',
        }}
      />
    </Dialog>
  )
}
