import {
  ListboxButton as HeadlessListBoxButton,
  ListboxOptions as HeadlessListboxOptions,
  ListboxOption as HeadlessListboxOption,
  type ListboxButtonProps,
  type ListboxOptionsProps,
  type ListboxOptionProps,
} from '@headlessui/react'
import { cnx } from '@/lib/utils'
import { Button } from '@heroui/react'
import { IconCheck } from '@/icons'

export { Listbox } from '@headlessui/react'

export function ListboxTrigger(props: ListboxButtonProps<typeof Button>) {
  return <HeadlessListBoxButton {...props} className={cnx('bg-default-100', props.className?.toString())} />
}

export function ListboxOptions(props: ListboxOptionsProps) {
  return (
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
  )
}

export function ListboxOption(props: Omit<ListboxOptionProps, 'value'> & { value: unknown }) {
  return (
    <HeadlessListboxOption
      {...props}
      className={cnx(
        'ui-active:bg-foreground-100 flex cursor-pointer items-center gap-x-2 px-3 py-1.5',
        props.className?.toString(),
      )}
    >
      {props.children as React.ReactNode}
      <IconCheck className='ui-selected:visible invisible' />
    </HeadlessListboxOption>
  )
}
