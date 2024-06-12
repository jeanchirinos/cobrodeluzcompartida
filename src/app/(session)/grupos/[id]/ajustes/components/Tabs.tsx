'use client'

import { Link } from '@/components/Link'
import { ROUTE } from '@/routes'
import { Tabs as NextuiTabs, Tab } from '@nextui-org/tabs'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

export function Tabs() {
  const params = useParams()
  const { id: rentalGroupId } = params as { id: string }

  const selectedLayoutSegment = useSelectedLayoutSegment()

  return (
    <NextuiTabs
      isVertical
      aria-label='Opciones del grupo'
      selectedKey={selectedLayoutSegment}
      className='max-md:hidden'
      variant='light'
    >
      <Tab
        key='general'
        title='General'
        as={Link}
        href={ROUTE.GROUPS.SETTINGS.GENERAL({ id: rentalGroupId })}
      />
    </NextuiTabs>
  )
}
