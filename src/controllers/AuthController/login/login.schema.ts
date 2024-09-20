import { schemaUserBase } from '@/models/User'
import { z } from 'zod'

export const schemaLogin = schemaUserBase.pick({ email: true, password: true })

export type ArgsLoginFn = z.infer<typeof schemaLogin>
