import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
  MenuSeparator as HeadlessMenuSeparator,
  Transition,
  type MenuProps,
  type MenuButtonProps,
  type MenuItemsProps,
  type MenuItemProps,
  type MenuSeparatorProps,
} from '@headlessui/react'
import { cnx } from '@/lib/utils'

export function Menu(props: MenuProps) {
  return <HeadlessMenu {...props} />
}
export function MenuTrigger(props: MenuButtonProps) {
  return <HeadlessMenuButton {...props} />
}

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
        {...props}
        anchor={{
          to: 'bottom end',
          gap: '0.5rem',
        }}
        className={cnx(
          'flex flex-col rounded-md bg-content1 text-sm shadow-small z-50 w-fit',
          props.className?.toString()
        )}
      >
        {props.children}
      </HeadlessMenuItems>
    </Transition>
  )
}

export function MenuItem(props: MenuItemProps) {
  return <HeadlessMenuItem {...props} />
}

export function MenuSeparator(props: MenuSeparatorProps) {
  return (
    <HeadlessMenuSeparator
      {...props}
      className={cnx('h-px bg-content2', props.className?.toString())}
    />
  )
}
