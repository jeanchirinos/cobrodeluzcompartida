import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'

type Props = { result: Result }

export function Results(props: Props) {
  const { result } = props

  return (
    <section className='space-y-unit-2xl'>
      <h3 className='text-large font-semibold'>Resultado</h3>
      <Table
        removeWrapper
        aria-label='Tabla de resultado'
        className='w-full md:w-unit-6xl max-w-full'
      >
        <TableHeader>
          <TableColumn>Participante</TableColumn>
          <TableColumn>Monto</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Sin datos para mostrar'>
          {result
            ? result.map(item => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>S/. {item.amount}</TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </section>
  )
}
