'use client'

import { Image } from '@/components/Image'
import { Chip } from '@nextui-org/react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { TenantOptions } from './TenantOptions'
import { ResponseGetTenants } from '@/controllers/TenatController/getTenants'

export function TenantsTable(props: { tenants: ResponseGetTenants }) {
  const { tenants } = props

  return (
    <Table className='overflow-x-auto'>
      <TableHeader>
        <TableColumn>Avatar</TableColumn>
        <TableColumn>Alias</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn>Opciones</TableColumn>
      </TableHeader>
      <TableBody emptyContent='Sin datos para mostrar'>
        {tenants.map(tenant => (
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
        ))}
      </TableBody>
    </Table>
  )
}
