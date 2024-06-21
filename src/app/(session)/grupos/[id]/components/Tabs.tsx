'use client'

import { Link } from '@/components/Link'
import { IconLightMeter, IconReceipt, IconSettings } from '@/icons'
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
        tabIndex={0}
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
        tabIndex={0}
        key='medidores'
        as={Link}
        title={
          <div className='flex items-center gap-x-2'>
            <IconLightMeter size={16} /> Medidores
          </div>
        }
        href={ROUTE.GROUPS.LIGHT_METERS.INDEX({ groupId: rentalGroupId })}
      />
      <Tab
        tabIndex={0}
        key='ajustes'
        as={Link}
        title={
          <div className='flex items-center gap-x-2'>
            <IconSettings /> Ajustes
          </div>
        }
        href={ROUTE.GROUPS.SETTINGS({ id: rentalGroupId })}
      />
    </NextuiTabs>
  )
}
