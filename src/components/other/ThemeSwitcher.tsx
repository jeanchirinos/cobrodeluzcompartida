'use client'

import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { IconCheck, IconDarkTheme, IconLightTheme, IconSystemTheme } from '@/icons'
import { Fragment, useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'

const themes = [
  {
    id: 'system',
    name: 'Sistema',
    icon: <IconSystemTheme />,
  },
  {
    id: 'light',
    name: 'Claro',
    icon: <IconLightTheme />,
  },
  {
    id: 'dark',
    name: 'Oscuro',
    icon: <IconDarkTheme />,
  },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const selectedTheme = themes.find(t => t.id === theme) ?? themes[0]

  return (
    <Listbox value={selectedTheme} onChange={theme => setTheme(theme.id)}>
      <ListboxButton as={Fragment}>
        <Button isIconOnly className='bg-default-100' size='sm' aria-label={`Tema ${selectedTheme.name}`}>
          {selectedTheme.icon}
        </Button>
      </ListboxButton>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <ListboxOptions
          modal={false}
          anchor={{
            to: 'bottom end',
            gap: '0.5rem',
          }}
          className='z-40 max-h-60 w-max overflow-auto rounded-md bg-content1 text-small shadow-small focus:outline-none'
        >
          {themes.map(theme => (
            <ListboxOption
              key={theme.id}
              value={theme}
              onClick={() => setTheme(theme.id)}
              className='flex cursor-pointer items-center justify-between gap-x-2 px-3 py-1.5 ui-active:bg-foreground-100'
              aria-label={theme.name}
            >
              <div className='flex items-center gap-x-1.5'>
                {theme.icon}
                <span>{theme.name}</span>
              </div>
              <IconCheck className='invisible ui-selected:visible' />
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Transition>
    </Listbox>
  )
}
