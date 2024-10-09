'use client'

import { Link } from '@/components/Link'
import { ROUTE } from '@/constants/routes'
import { IconParticipants, IconSettings } from '@/icons'
import { Tabs, Tab, TabsProps } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

const tabs = [
  { key: 'inquilinos', title: 'Inquilinos', icon: IconParticipants, href: ROUTE.GROUPS.PARTICIPANTS.TENANTS },
  { key: 'ajustes', title: 'Ajustes', icon: IconSettings, href: ROUTE.GROUPS.PARTICIPANTS.SETTINGS },
]

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
      {tabs.map(tab => (
        <Tab
          key={tab.key}
          as={Link}
          href={tab.href({ participantId, rentalGroupId })}
          tabIndex={0}
          title={
            <div className='flex items-center gap-x-2'>
              <tab.icon /> {tab.title}
            </div>
          }
        />
      ))}
    </Tabs>
  )
}
