'use client'

import { Image } from '@/components/Image'
import { useGetTenants } from '@/controllers/TenatController/getTenants/useGetTenants'
import { Chip, Spinner } from '@heroui/react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { TenantOptions } from './TenantOptions'
import { ErrorUi } from '@/components/other/ComponentError'

export function TenantsTable() {
  const { data, isError, isPending, isSuccess } = useGetTenants()

  if (isError) return <ErrorUi />

  return (
    <Table classNames={{ wrapper: 'overflow-x-auto' }}>
      <TableHeader>
        <TableColumn>Avatar</TableColumn>
        <TableColumn>Alias</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn>Opciones</TableColumn>
      </TableHeader>
      <TableBody emptyContent='Sin datos para mostrar' isLoading={isPending} loadingContent={<Spinner />}>
        {isSuccess
          ? data.tenants.map(tenant => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Image src={tenant.avatar_url} alt={tenant.alias} size={48} className='rounded-full' />
                </TableCell>
                <TableCell>{tenant.alias}</TableCell>
                <TableCell>
                  <Chip className='border-none' color={tenant.active ? 'success' : 'default'} variant='dot'>
                    {tenant.active ? 'Activo' : 'Inactivo'}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <TenantOptions tenant={tenant} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  )
}
