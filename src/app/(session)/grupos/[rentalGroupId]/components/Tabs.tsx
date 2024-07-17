'use client'

import { Link } from '@/components/Link'
import { IconParticipant, IconReceipt, IconSettings } from '@/icons'
import { ROUTE } from '@/constants/routes'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()
  const { rentalGroupId } = params as { rentalGroupId: string }

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
        href={ROUTE.GROUPS.REGISTERS.INDEX({ id: rentalGroupId })}
      />
      <Tab
        tabIndex={0}
        key='medidores'
        as={Link}
        title={
          <div className='flex items-center gap-x-2'>
            <IconParticipant className='text-lg' /> Medidores
          </div>
        }
        href={ROUTE.GROUPS.PARTICIPANTS.INDEX({ rentalGroupId })}
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
