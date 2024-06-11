import { type ComponentProps, type ReactNode, type PropsWithChildren, useState } from 'react'
import { type UseDialog } from './useDialog'
import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  TransitionChild,
  Transition,
  DialogTitle as HeadlessDialogTitle,
  DialogTitleProps,
  Description,
} from '@headlessui/react'
import { DialogContent } from './DialogContent'
import { cnx } from '@/lib/utils'
import { Button } from '@nextui-org/react'
import { IconClose } from '@/icons'
import { HookFormButton } from '../ReactForm/HookFormButton'

interface Props extends PropsWithChildren {
  dialog: UseDialog
  preventCloseOnClickingBackdrop?: boolean
  onExitComplete?(): void
  dialogTitle?: ReactNode
}

export function Dialog(props: Props) {
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
              <HeadlessDialogPanel className='max-h-full rounded-2xl bg-content1 shadow-small max-w-md flex flex-col py-5 gap-y-4'>
                <Button
                  onPress={dialog.close}
                  variant='light'
                  isIconOnly
                  className='absolute top-0.5 right-0.5 data-[hover]:bg-default/40'
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
  return (
    <HeadlessDialogTitle
      {...props}
      className={cnx('px-6 font-bold', props.className?.toString())}
    />
  )
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

type DialogFooterProps = (
  | {
      variant: '1'
      dialog: UseDialog
      customHandleClick?: undefined
      useFormHook?: undefined
      mainButtonProps?: undefined
    }
  | {
      variant: '2'
      dialog: UseDialog
      customHandleClick: () => void | Promise<void>
      useFormHook?: undefined
      mainButtonProps?: ComponentProps<typeof Button>
    }
  | {
      variant?: '3'
      dialog: UseDialog
      customHandleClick?: undefined
      useFormHook: ComponentProps<typeof HookFormButton>['useFormHook']
      mainButtonProps?: Omit<ComponentProps<typeof HookFormButton>, 'useFormHook'>
    }
) &
  ComponentProps<'footer'>

export function DialogFooter(props: DialogFooterProps) {
  const {
    variant = '1',
    dialog,
    customHandleClick,
    mainButtonProps,
    useFormHook,
    ...restProps
  } = props

  const [isPending, setIsPending] = useState(false)

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setIsPending(true)
    // await customHandleClick?.(e)
    await customHandleClick?.()
    // formAction()
    setIsPending(false)
    dialog.close()
  }

  return (
    <footer {...restProps} className={cnx('px-6 gap-x-4 flex justify-end mt-4', props.className)}>
      {variant === '1' && (
        <>
          <Button onPress={dialog?.close} variant='flat'>
            Cerrar
          </Button>
          <Button onPress={dialog?.close} color='primary'>
            Entendido
          </Button>
        </>
      )}

      {variant === '2' && (
        <>
          <Button onPress={dialog?.close} variant='flat'>
            Cancelar
          </Button>
          <Button color='primary' isLoading={isPending} {...mainButtonProps} onClick={handleClick}>
            {mainButtonProps?.children ?? 'Aceptar'}
          </Button>
        </>
      )}

      {variant === '3' && (
        <>
          <Button onPress={dialog?.close} variant='flat'>
            Cancelar
          </Button>
          <HookFormButton
            {...mainButtonProps}
            useFormHook={useFormHook!}
            onClick={() => {
              useFormHook?.onSubmit()
            }}
          >
            {mainButtonProps?.children ?? 'Aceptar'}
          </HookFormButton>
        </>
      )}
    </footer>
  )
}
