'use client'

import { Dialog } from '@/components/Dialog/Dialog'
import { useDialog } from '@/components/Dialog/useDialog'
import { CloseButton, Description, DialogTitle } from '@headlessui/react'
import { Button } from '@nextui-org/react'

export default function Page() {
  const myDialog = useDialog()

  return (
    <main>
      <button onClick={myDialog.open}>Open</button>
      <Dialog dialog={myDialog}>
        {/* <div className='grid'> */}
        <DialogTitle className='font-bold'>Deactivate account</DialogTitle>
        <div className='overflow-auto'>
          <Description>This will permanently deactivate your account</Description>
          <div className='bg-green-500 h-[1500px]'>
            <p>
              Are you sure you want to deactivate your account? All of your data will be permanently
              removed.
            </p>
          </div>
        </div>
        <div className='flex gap-4 justify-end'>
          <CloseButton as={Button}>Cancel</CloseButton>
          <Button onClick={myDialog.close} color='danger'>
            Desactivate
          </Button>
        </div>
        {/* </div> */}
      </Dialog>
    </main>
  )
}
