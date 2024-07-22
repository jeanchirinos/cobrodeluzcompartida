'use client'

import { ResponseCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import { ResponseGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/getRentalGroupRegister'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Image } from '@/components/Image'

type ResultsTableProps = {
  results: ResponseCalculateResults | ResponseGetRentalGroupRegister['results']
  variant?: 'registers' | 'calculate'
}

const DEPENDANT_ATTRIBUTE = 'tenant_id'

export function ResultsTable(props: ResultsTableProps) {
  const { results, variant = 'calculate' } = props

  // const isRegistersPage = variant === 'registers'

  // const columns = [
  //   {
  //     key: 'alias',
  //     label: 'Inquilino',
  //   },
  //   {
  //     key: 'consumption_kwh',
  //     label: 'Consumo',
  //   },
  //   {
  //     key: 'amount',
  //     label: 'Monto',
  //   },
  //   {}
  // ]

  // if (isRegistersPage) {
  //   columns.push({
  //     key: 'date',
  //     label: 'Fecha',
  //   })
  // }

  return (
    <Table aria-label='Tabla de resultado' className='w-fit'>
      {/* <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader> */}
      <TableHeader>
        <TableColumn>Inquilino</TableColumn>
        <TableColumn>Consumo</TableColumn>
        <TableColumn>Monto</TableColumn>
        {/* {isRegistersPage && (
          <TableColumn>
            <></>
          </TableColumn>
        )} */}
      </TableHeader>

      <TableBody emptyContent='Sin datos para mostrar'>
        {results.map(item => (
          <TableRow key={item.tenant.alias}>
            <TableCell>
              <div className='flex items-center gap-x-2'>
                {DEPENDANT_ATTRIBUTE in item && (
                  <Image src={item.tenant.avatar_url} alt={item.tenant.alias} size={32} />
                )}
                <span>{item.tenant.alias}</span>
              </div>
            </TableCell>
            <TableCell className='text-right'>
              {item.consumption_kwh % 1 === 0 ? item.consumption_kwh : item.consumption_kwh.toFixed(2)}{' '}
              <span className='text-tiny text-foreground-500'>kWh</span>
            </TableCell>
            <TableCell>
              <p className='rounded-md bg-success-100 px-2 py-1 text-right'>S/. {item.amount}</p>
            </TableCell>
            {/* {isRegistersPage ? <TableCell>Fecha</TableCell> : <></>} */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
