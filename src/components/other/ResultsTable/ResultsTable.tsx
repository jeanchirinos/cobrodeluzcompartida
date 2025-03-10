'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import { Image } from '@/components/Image'
import { Key, useCallback, useMemo } from 'react'
import { Chip, Tooltip } from '@heroui/react'
import { ResultRow } from './ResultsTable.type'

type ResultsTableProps = {
  results: ResultRow[]
  variant?: 'registers' | 'calculate'
}

export function ResultsTable(props: ResultsTableProps) {
  const { results, variant = 'calculate' } = props

  const headerColumns = useMemo(() => {
    const columns = [
      {
        key: 'alias',
        label: 'Inquilino',
      },
      {
        key: 'consumption_kwh',
        label: 'Consumo',
      },
      {
        key: 'amount',
        label: 'Monto',
      },
    ]

    if (variant === 'registers') {
      columns.push({
        key: 'active',
        label: 'Activo',
      })
    }
    return columns
  }, [variant])

  const renderCell = useCallback((item: ResultsTableProps['results'][0], columnKey: Key) => {
    switch (columnKey) {
      case 'alias':
        return (
          <div className='flex w-max items-center gap-x-2'>
            {item.tenant.avatar_url && <Image src={item.tenant.avatar_url} alt={item.tenant.alias} size={32} />}
            <span>{item.tenant.alias}</span>
          </div>
        )
      case 'consumption_kwh':
        return (
          <div className='ml-auto w-max'>
            <span>
              {item.result.consumption_kwh % 1 === 0
                ? item.result.consumption_kwh
                : item.result.consumption_kwh.toFixed(2)}{' '}
            </span>
            <span className='text-tiny text-foreground-500'>kWh</span>
          </div>
        )
      case 'amount':
        return <p className='ml-auto w-max rounded-md bg-success-100 px-2 py-1'>S/. {item.result.amount}</p>
      case 'active':
        if (item.participant) {
          const objectInactive = !item.participant.active ? (
            <>
              medidor <b>{item.participant.alias}</b>
            </>
          ) : !item.tenant.active ? (
            <b>inquilino</b>
          ) : (
            ''
          )

          const content = (
            <span>
              El {objectInactive} está <Chip variant='dot'>Inactivo</Chip>
            </span>
          )

          const element =
            item.participant.active && item.tenant.active ? (
              <span className='mx-auto block size-2 rounded-full bg-success-500' />
            ) : (
              <span className='mx-auto block size-2 rounded-full bg-default-400' />
            )

          if (item.participant.active && item.tenant.active) {
            return element
          } else {
            return <Tooltip content={content}>{element}</Tooltip>
          }
        }

        return <></>

      default:
        return <></>
    }
  }, [])

  return (
    <Table
      aria-label='Tabla de resultado'
      className='md:w-fit'
      classNames={{
        wrapper: 'overflow-x-auto',
      }}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn className='min-w-max' key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent='Sin datos para mostrar' items={results}>
        {item => <TableRow key={item.id}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  )
}
