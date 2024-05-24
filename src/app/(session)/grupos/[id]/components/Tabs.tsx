'use client'

import { Link } from '@/components/Link'
import { IconParticipants, IconReceipt, IconSettings } from '@/icons'
import { ROUTE } from '@/routes'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()
  const { id } = params as { id: string }

  const selectedLayoutSegment = useSelectedLayoutSegment()

  return (
    <NextuiTabs
      variant='underlined'
      aria-label='Opciones del grupo'
      selectedKey={selectedLayoutSegment}
      className='overflow-x-auto max-w-full'
    >
      <Tab
        key='registros'
        title={
          <div className='flex gap-x-2 items-center'>
            <IconReceipt /> Registros
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.REGISTERS(id)}
      />
      <Tab
        key='participantes'
        as={Link}
        title={
          <div className='flex gap-x-2 items-center'>
            <IconParticipants /> Participantes
          </div>
        }
        href={ROUTE.GROUPS.PARTICIPANTS(id)}
      />
      <Tab
        key='ajustes'
        as={Link}
        title={
          <div className='flex gap-x-2 items-center'>
            <IconSettings /> Ajustes
          </div>
        }
        href={ROUTE.GROUPS.SETTINGS.GENERAL(id)}
      />
    </NextuiTabs>
  )
}
