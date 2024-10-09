'use client'

import { Link } from '@/components/Link'
import { IconParticipant, IconReceipt, IconSettings } from '@/icons'
import { ROUTE } from '@/constants/routes'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

const tabs = [
  {
    key: 'registros',
    title: 'Registros',
    icon: <IconReceipt />,
    href: ROUTE.GROUPS.REGISTERS.INDEX,
  },
  {
    key: 'medidores',
    title: 'Medidores',
    icon: <IconParticipant className='text-lg' />,
    href: ROUTE.GROUPS.PARTICIPANTS.INDEX,
  },
  {
    key: 'ajustes',
    title: 'Ajustes',
    icon: <IconSettings />,
    href: ROUTE.GROUPS.SETTINGS,
  },
]

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
      {tabs.map(tab => (
        <Tab
          key={tab.key}
          as={Link}
          href={tab.href({ rentalGroupId })}
          tabIndex={0}
          title={
            <div className='flex items-center gap-x-2'>
              {tab.icon} {tab.title}
            </div>
          }
        />
      ))}
    </NextuiTabs>
  )
}
