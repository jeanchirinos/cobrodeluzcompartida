'use client'

import { Image } from '@/components/Image'
import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'

export function ResultsTable() {
  const {
    data: { rentalGroupRegister },
  } = useGetRentalGroupRegister()

  const { results } = rentalGroupRegister!

  return (
    <Table aria-label='Tabla de resultado' className='w-full max-w-full md:w-64'>
      <TableHeader>
        <TableColumn>Medidor</TableColumn>
        <TableColumn>Monto</TableColumn>
      </TableHeader>
      <TableBody emptyContent='Sin datos para mostrar'>
        {results.map(result => (
          <TableRow key={result.tenant.alias}>
            <TableCell>
              <div className='flex items-center gap-x-2'>
                <Image src={result.tenant.avatar_url} alt={result.tenant.alias} size={24} className='rounded-full' />
                {result.tenant.alias}
              </div>
            </TableCell>
            <TableCell>S/. {result.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
