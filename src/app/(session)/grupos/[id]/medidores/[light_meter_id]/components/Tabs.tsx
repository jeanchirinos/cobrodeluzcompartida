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
      variant='light'
      classNames={{
        // wrapper: 'max-md:absolute max-md:inset-0 max-md:z-20 max-md:bg-background',
        wrapper: `${selectedLayoutSegment && 'max-md:hidden'}`,
        // tab: 'justify-start max-md:w-full',
        tab: 'justify-start',
        // base: 'max-md:w-full',
        // tabList: 'max-md:w-full',
      }}
    >
      <Tab
        key='arrendatarios'
        title={
          <div className='flex items-center gap-x-2'>
            <IconParticipants /> Arrendatarios
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.LIGHT_METERS.TENANTS({ id: light_meter_id, groupId: rentalGroupId })}
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
