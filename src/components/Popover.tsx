import {
  Popover as HeadlessPopover,
  PopoverButton as HeadlessPopoverButton,
  PopoverPanel as HeadlessPopoverPanel,
  type PopoverProps,
  type PopoverButtonProps,
  type PopoverPanelProps,
  Transition,
} from '@headlessui/react'
import { cnx } from '@/lib/utils'
import { Button } from '@nextui-org/react'

export function Popover(props: PopoverProps) {
  return <HeadlessPopover {...props} className={cnx('z-50', props.className?.toString())} />
}

export function PopoverTrigger(props: PopoverButtonProps<typeof Button>) {
  return <HeadlessPopoverButton {...props} as={Button} />
}

export function PopoverContent(props: PopoverPanelProps) {
  return (
    <Transition
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-1'
    >
      <HeadlessPopoverPanel
        {...props}
        anchor={{
          to: 'bottom end',
          gap: '0.5rem',
        }}
        className={cnx('rounded-md', props.className?.toString())}
      >
        {props.children}
      </HeadlessPopoverPanel>
    </Transition>
  )
}
