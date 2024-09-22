import { schemaUserBase } from '@/models/User'
import { z } from 'zod'

export const schemaLogin = schemaUserBase.pick({ email: true, password: true })

export type SchemaLogin = z.infer<typeof schemaLogin>
