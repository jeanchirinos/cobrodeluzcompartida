import { schemaUserBase } from '@/models/User'
import { z } from 'zod'

export const schemaRecoverPassword = schemaUserBase.pick({ email: true })

export type SchemaRecoverPassword = z.infer<typeof schemaRecoverPassword>
