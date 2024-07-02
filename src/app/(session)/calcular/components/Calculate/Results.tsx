'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useCalculateContext } from '../../context/CalculateContext'

export function Results() {
  const { result } = useCalculateContext()

  return (
    <section className='space-y-10'>
      <h3 className='text-large font-semibold'>Resultado</h3>
      <Table aria-label='Tabla de resultado' className='w-full max-w-full md:w-64'>
        <TableHeader>
          <TableColumn>Medidor</TableColumn>
          <TableColumn>Monto</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Sin datos para mostrar'>
          {result
            ? result.map(item => (
                <TableRow key={item.participant.tenant.alias}>
                  <TableCell>{item.participant.tenant.alias}</TableCell>
                  <TableCell>S/. {item.participant.tenant.amount}</TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </section>
  )
}
