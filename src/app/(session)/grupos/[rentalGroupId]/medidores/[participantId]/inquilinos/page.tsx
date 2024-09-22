import { Metadata } from 'next'
import { TenantsTable } from './components/TenantsTable'
import { AddTenant } from './components/AddTenant'

export const metadata: Metadata = {
  title: 'Inquilinos',
}

export default function Page() {
  return (
    <div className='flex w-full flex-col gap-y-4'>
      <AddTenant />
      <div className='flex w-fit max-w-full flex-col items-center gap-y-12'>
        <TenantsTable />
      </div>
    </div>
  )
}
