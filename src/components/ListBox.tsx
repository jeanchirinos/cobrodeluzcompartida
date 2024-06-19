import {
  ListboxButton as HeadlessListBoxButton,
  ListboxOptions as HeadlessListboxOptions,
  ListboxOption as HeadlessListboxOption,
  Transition,
  type ListboxButtonProps,
  type ListboxOptionsProps,
  type ListboxOptionProps,
} from '@headlessui/react'
import { cnx } from '@/lib/utils'
import { Button } from '@nextui-org/react'
import { IconCheck } from '@/icons'

export { Listbox } from '@headlessui/react'

export function ListboxTrigger(props: ListboxButtonProps<typeof Button>) {
  return <HeadlessListBoxButton {...props} as={Button} className={cnx('bg-default-100', props.className?.toString())} />
}

export function ListboxOptions(props: ListboxOptionsProps) {
  return (
    <Transition
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
    >
      <HeadlessListboxOptions
        modal={false}
        anchor={{
          to: 'bottom end',
          gap: '0.5rem',
        }}
        {...props}
        className={cnx(
          'z-40 w-max overflow-auto rounded-md bg-content1 shadow-small focus:outline-none',
          props.className?.toString(),
        )}
      >
        {props.children}
      </HeadlessListboxOptions>
    </Transition>
  )
}

export function ListboxOption(props: Omit<ListboxOptionProps, 'value'> & { value: unknown }) {
  return (
    <HeadlessListboxOption
      {...props}
      className={cnx(
        'flex cursor-pointer items-center gap-x-2 px-3 py-1.5 ui-active:bg-foreground-100',
        props.className?.toString(),
      )}
    >
      {props.children as React.ReactNode}
      <IconCheck className='invisible ui-selected:visible' />
    </HeadlessListboxOption>
  )
}
