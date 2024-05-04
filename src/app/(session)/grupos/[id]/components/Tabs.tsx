'use client'

import { Link } from '@/components/Link'
import { IconReceipt, IconSettings } from '@/icons'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()

  const selectedLayoutSegment = useSelectedLayoutSegment()
  const selectedKey = selectedLayoutSegment ?? 'default'

  return (
    <NextuiTabs
      variant='underlined'
      aria-label='Opciones del grupo'
      selectedKey={selectedKey}
      className='overflow-x-auto max-w-full'
    >
      <Tab
        key='default'
        title={
          <div className='flex gap-x-2 items-center'>
            <IconReceipt /> Registros
          </div>
        }
        as={Link}
        href={`/grupos/${params.id}`}
      />
      <Tab
        key='participantes'
        as={Link}
        title={
          <div className='flex gap-x-2 items-center'>
            <IconSettings /> Participantes
          </div>
        }
        href={`/grupos/${params.id}/participantes`}
      />
      <Tab
        key='ajustes'
        as={Link}
        title={
          <div className='flex gap-x-2 items-center'>
            <IconSettings /> Ajustes
          </div>
        }
        href={`/grupos/${params.id}/ajustes`}
      />
    </NextuiTabs>
  )
}
