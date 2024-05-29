import { Fragment, type PropsWithChildren } from 'react'
import { type UseDialog } from './useDialog'
import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  TransitionChild,
  Transition,
} from '@headlessui/react'
import { DialogContent } from './DialogContent'

interface Props extends PropsWithChildren {
  dialog: UseDialog
  preventCloseOnClickingBackdrop?: boolean
  onExitComplete?(): void
}

export function Dialog(props: Props) {
  const { dialog, children, preventCloseOnClickingBackdrop, onExitComplete } = props

  const onClose = preventCloseOnClickingBackdrop ? () => {} : dialog.close

  return (
    <>
      <Transition show={dialog.isOpen}>
        <HeadlessDialog onClose={onClose}>
          <TransitionChild
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 z-50 bg-black/60' />
          </TransitionChild>
          <div className='fixed inset-0 z-50 p-4 flex-center'>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <HeadlessDialogPanel className='max-h-full rounded-2xl bg-content1 shadow-small max-w-md flex flex-col py-5'>
                <DialogContent isOpen={dialog.isOpen} onExitComplete={onExitComplete}>
                  {children}
                </DialogContent>
              </HeadlessDialogPanel>
            </TransitionChild>
          </div>
        </HeadlessDialog>
      </Transition>
    </>
  )
}
