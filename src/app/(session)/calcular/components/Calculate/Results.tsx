import { CreateRentalGroupRegisterBody } from '@/controllers/RentalGroupRegisterController/utils/types'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'

type Props = { result: CreateRentalGroupRegisterBody | null }

export function Results(props: Props) {
  const { result } = props

  return (
    <section className='space-y-10'>
      <h3 className='text-large font-semibold'>Resultado</h3>
      <Table removeWrapper aria-label='Tabla de resultado' className='w-full max-w-full md:w-64'>
        <TableHeader>
          <TableColumn>Medidor</TableColumn>
          <TableColumn>Monto</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Sin datos para mostrar'>
          {result
            ? result.results.map(item => (
                <TableRow key={item.participant.alias}>
                  <TableCell>{item.participant.alias}</TableCell>
                  <TableCell>S/. {item.amount}</TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </section>
  )
}
