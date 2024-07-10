'use client'

import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { IconParticipants, IconSettings } from '@/icons'
import { Tabs, Tab, TabsProps } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function ParticipantTabs(props: TabsProps) {
  const params = useParams()
  const { rentalGroupId, participantId } = params as { rentalGroupId: string; participantId: string }

  const selectedLayoutSegment = useSelectedLayoutSegment()
  const { classNames, ...restProps } = props

  return (
    <Tabs
      aria-label='Opciones del grupo'
      selectedKey={selectedLayoutSegment}
      variant='light'
      classNames={{
        tab: 'justify-start',
        ...classNames,
      }}
      {...restProps}
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
    </Tabs>
  )
}
