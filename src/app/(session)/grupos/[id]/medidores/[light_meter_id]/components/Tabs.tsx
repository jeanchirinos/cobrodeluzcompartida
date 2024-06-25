'use client'

import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { IconParticipants, IconSettings } from '@/icons'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()
  const { id: rentalGroupId, light_meter_id } = params as { id: string; light_meter_id: string }

  const selectedLayoutSegment = useSelectedLayoutSegment()

  return (
    <NextuiTabs
      isVertical
      aria-label='Opciones del grupo'
      selectedKey={selectedLayoutSegment}
      className='max-md:hidden'
      variant='light'
      classNames={{
        tab: 'justify-start',
      }}
    >
      <Tab
        key='participantes'
        title={
          <div className='flex items-center gap-x-2'>
            <IconParticipants /> Participantes
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.LIGHT_METERS.PARTICIPANTS({ id: light_meter_id, groupId: rentalGroupId })}
      />
      <Tab
        key='ajustes'
        title={
          <div className='flex items-center gap-x-2'>
            <IconSettings /> Ajustes
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.LIGHT_METERS.SETTINGS({ id: light_meter_id, groupId: rentalGroupId })}
      />
    </NextuiTabs>
  )
}
