import { schemaTenant } from '@/models/Tenant'

export const schemaUpdateTenant = schemaTenant.omit({ id: true }).partial()
