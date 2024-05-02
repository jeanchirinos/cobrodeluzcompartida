import { BillData } from '@/models/BillData'
import { Participant } from '@/models/Participant'
import { Result } from '@/models/Result'

export type CreateRentalGroupRegisterBody = {
  billData: Omit<BillData, 'id' | 'rental_group_id'>
  results: (Pick<Result, 'consumption_kwh' | 'amount'> & {
    participant: Pick<Participant, 'alias' | 'is_main'>
  })[]
}
