import { schemaTenant } from '@/models/Tenant'

export const schemaUpdateTenant = schemaTenant.pick({ alias: true, active: true }).partial()
