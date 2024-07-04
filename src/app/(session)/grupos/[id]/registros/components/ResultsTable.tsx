'use client'

import { Image } from '@/components/Image'
import { ResponseGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'

type ResultsTableProps = Pick<ResponseGetRentalGroupRegister, 'results'>

export function ResultsTable(props: ResultsTableProps) {
  const { results } = props

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
