import { Participant } from '@/models/Participant'
import { Result } from '@/models/Result'
import { Tenant } from '@/models/Tenant'

export type ResultRow = {
  id: string | number
  result: Pick<Result, 'amount' | 'consumption_kwh'>
  participant?: Participant
  tenant: Partial<Pick<Tenant, 'id' | 'avatar_url' | 'active'>> & Pick<Tenant, 'alias'>
}
