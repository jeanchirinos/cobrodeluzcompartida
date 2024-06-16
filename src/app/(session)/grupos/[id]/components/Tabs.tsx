'use client'

import { Link } from '@/components/Link'
import { IconParticipants, IconReceipt, IconSettings } from '@/icons'
import { ROUTE } from '@/constants/routes'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()
  const { id: rentalGroupId } = params as { id: string }

  const selectedLayoutSegment = useSelectedLayoutSegment()

  return (
    <NextuiTabs
      variant='underlined'
      aria-label='Opciones del grupo'
      selectedKey={selectedLayoutSegment}
      className='max-w-full overflow-x-auto'
    >
      <Tab
        key='registros'
        title={
          <div className='flex items-center gap-x-2'>
            <IconReceipt /> Registros
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.REGISTERS({ id: rentalGroupId })}
      />
      <Tab
        key='participantes'
        as={Link}
        title={
          <div className='flex items-center gap-x-2'>
            <IconParticipants /> Participantes
          </div>
        }
        href={ROUTE.GROUPS.PARTICIPANTS({ id: rentalGroupId })}
      />
      <Tab
        key='ajustes'
        as={Link}
        title={
          <div className='flex items-center gap-x-2'>
            <IconSettings /> Ajustes
          </div>
        }
        href={ROUTE.GROUPS.SETTINGS.GENERAL({ id: rentalGroupId })}
      />
    </NextuiTabs>
  )
}
