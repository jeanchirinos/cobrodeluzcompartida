import { IconClose } from '@/icons'
import { cnx } from '@/lib/utils'
import {
  Description,
  DialogTitleProps,
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  DialogTitle as HeadlessDialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Button } from '@heroui/react'
import { type ComponentProps, type PropsWithChildren, type ReactNode } from 'react'
import { DialogContent } from './DialogContent'
import { type UseDialog } from './useDialog'

type DialogProps = PropsWithChildren & {
  dialog: UseDialog
  preventCloseOnClickingBackdrop?: boolean
  onExitComplete?: () => void
  dialogTitle?: ReactNode
}

export function Dialog(props: DialogProps) {
  const { dialog, children, preventCloseOnClickingBackdrop, onExitComplete, dialogTitle } = props

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
              <HeadlessDialogPanel className='relative flex max-h-full max-w-md flex-col gap-y-4 rounded-2xl bg-content1 py-5 shadow-small'>
                <Button
                  onPress={dialog.close}
                  variant='light'
                  isIconOnly
                  className='absolute right-0.5 top-0.5 data-[hover]:bg-default/40'
                  radius='full'
                >
                  <IconClose />
                </Button>
                {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}

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

export function DialogTitle(props: DialogTitleProps) {
  return <HeadlessDialogTitle {...props} className={cnx('px-6 font-bold', props.className?.toString())} />
}

type DialogBodyProps = ComponentProps<'div'> & {
  dialogDescription?: ReactNode
}

export function DialogBody(props: DialogBodyProps) {
  const { dialogDescription } = props

  return (
    <div {...props} className={cnx('overflow-auto px-6', props.className)}>
      {dialogDescription && <Description>{dialogDescription}</Description>}
      {props.children}
    </div>
  )
}

export function DialogFooter(props: React.PropsWithChildren) {
  return <footer className={cnx('mt-4 flex justify-end gap-x-4 px-6')}>{props.children}</footer>
}
