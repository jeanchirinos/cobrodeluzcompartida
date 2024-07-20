'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useCalculateContext } from '../../context/CalculateContext'

export function Results() {
  const { result } = useCalculateContext()

  return (
    <section className='space-y-10'>
      <h3 className='text-large font-semibold'>Resultado</h3>
      <Table aria-label='Tabla de resultado' className=''>
        <TableHeader>
          <TableColumn>Medidor</TableColumn>
          <TableColumn>Consumo</TableColumn>
          <TableColumn>Monto</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Sin datos para mostrar'>
          {result
            ? result.map(item => (
                <TableRow key={item.tenant.alias}>
                  <TableCell>{item.tenant.alias}</TableCell>
                  <TableCell className='text-right'>
                    {item.consumption_kwh % 1 === 0 ? item.consumption_kwh : item.consumption_kwh.toFixed(2)}{' '}
                    <span className='text-small text-foreground-500'>kWh</span>
                  </TableCell>
                  <TableCell>
                    <p className='rounded-md bg-success-100 px-2 py-1 text-right'>S/. {item.amount}</p>
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </section>
  )
}
