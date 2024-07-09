'use client'

import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { IconParticipants, IconSettings } from '@/icons'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()
  const { rentalGroupId, participantId } = params as { rentalGroupId: string; participantId: string }

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
        key='inquilinos'
        title={
          <div className='flex items-center gap-x-2'>
            <IconParticipants /> Inquilinos
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.PARTICIPANTS.TENANTS({ id: participantId, rentalGroupId })}
      />
      <Tab
        key='ajustes'
        title={
          <div className='flex items-center gap-x-2'>
            <IconSettings /> Ajustes
          </div>
        }
        as={Link}
        href={ROUTE.GROUPS.PARTICIPANTS.SETTINGS({ id: participantId, rentalGroupId })}
      />
    </NextuiTabs>
  )
}
