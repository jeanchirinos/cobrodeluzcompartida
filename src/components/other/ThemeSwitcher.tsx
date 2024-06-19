'use client'

import { useTheme } from 'next-themes'
import { IconDarkTheme, IconLightTheme, IconSystemTheme } from '@/icons'
import { useEffect, useState } from 'react'
import { Listbox, ListboxOption, ListboxOptions, ListboxTrigger } from '@/components/ListBox'

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

  const [selectedTheme, setSelectedTheme] = useState(themes[0])

  useEffect(() => {
    const newSelectedTheme = themes.find(t => t.id === theme)

    if (!newSelectedTheme) return

    setSelectedTheme(newSelectedTheme)
  }, [theme])

  return (
    <Listbox value={selectedTheme} onChange={theme => setTheme(theme.id)}>
      <ListboxTrigger isIconOnly size='sm' aria-label={`Tema ${selectedTheme.name}`}>
        {selectedTheme.icon}
      </ListboxTrigger>
      <ListboxOptions className='max-h-60 text-small'>
        {themes.map(theme => (
          <ListboxOption
            key={theme.id}
            value={theme}
            onClick={() => setTheme(theme.id)}
            className='justify-between'
            aria-label={theme.name}
          >
            <div className='flex items-center gap-x-1.5'>
              {theme.icon}
              <span>{theme.name}</span>
            </div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
