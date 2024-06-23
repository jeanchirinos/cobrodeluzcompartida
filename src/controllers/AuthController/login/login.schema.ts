import { schemaUserBase } from '@/models/User'

export const schemaLogin = schemaUserBase.pick({ email: true, password: true })
