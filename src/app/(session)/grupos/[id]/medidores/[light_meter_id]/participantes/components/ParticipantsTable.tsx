'use client'

import { Image } from '@/components/Image'
import { Participant } from '@/models/Participant'
import { Chip } from '@nextui-org/react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { ParticipantOptions } from './ParticipantOptions'

export function ParticipantsTable(props: { participants: Participant[] }) {
  const { participants } = props

  return (
    <Table className='overflow-x-auto'>
      <TableHeader>
        <TableColumn>Avatar</TableColumn>
        <TableColumn>Alias</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn>Opciones</TableColumn>
      </TableHeader>
      <TableBody emptyContent='Sin datos para mostrar'>
        {participants.map(participant => (
          <TableRow key={participant.id}>
            <TableCell>
              <Image src={participant.avatar_url} alt={participant.alias} size={48} className='rounded-full' />
            </TableCell>
            <TableCell>{participant.alias}</TableCell>
            <TableCell>
              <Chip className='border-none' color={participant.is_main ? 'success' : 'default'} variant='dot'>
                {participant.is_main ? 'Activo' : 'Inactivo'}
              </Chip>
            </TableCell>
            <TableCell>
              <div className='flex items-center justify-center'>
                <ParticipantOptions participant={participant} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
