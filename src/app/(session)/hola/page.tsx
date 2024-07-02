'use client'

import { IconCheck } from '@/icons'
import { cnx } from '@/lib/utils'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]

export default function Example() {
  const [selected, setSelected] = useState(people[1])

  return (
    <div className='mx-auto h-screen w-52 pt-20'>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={cnx(
            'relative block w-full rounded-lg bg-white/5 py-1.5 pl-3 pr-8 text-left text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          )}
        >
          {selected.name}
          {/* <IconCheck
            className='group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60'
            aria-hidden='true'
          /> */}
        </ListboxButton>
        <ListboxOptions
          anchor='bottom'
          transition
          className={cnx(
            'w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            // 'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
          )}
        >
          {people.map(person => (
            <ListboxOption
              key={person.name}
              value={person}
              className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
            >
              <IconCheck className='invisible size-4 fill-white group-data-[selected]:visible' />
              <div className='text-sm/6 text-white'>{person.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}
