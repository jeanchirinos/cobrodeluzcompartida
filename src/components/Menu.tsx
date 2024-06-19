import {
  MenuItems as HeadlessMenuItems,
  MenuSeparator as HeadlessMenuSeparator,
  Transition,
  type MenuItemsProps,
  type MenuSeparatorProps,
} from '@headlessui/react'
import { cnx } from '@/lib/utils'

export { Menu, MenuButton as MenuTrigger, MenuItem } from '@headlessui/react'

export function MenuContent(props: MenuItemsProps) {
  return (
    <Transition
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-1'
    >
      <HeadlessMenuItems
        modal={false}
        anchor={{
          to: 'bottom end',
          gap: '0.5rem',
        }}
        {...props}
        className={cnx(
          'z-50 flex w-fit flex-col rounded-md bg-content1 text-sm shadow-small',
          props.className?.toString(),
        )}
      >
        {props.children}
      </HeadlessMenuItems>
    </Transition>
  )
}

export function MenuSeparator(props: MenuSeparatorProps) {
  return <HeadlessMenuSeparator {...props} className={cnx('h-px bg-content2', props.className?.toString())} />
}
