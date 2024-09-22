import { schemaTenant } from '@/models/Tenant'
import { z } from 'zod'

export const schemaUpdateTenant = schemaTenant.pick({ alias: true, active: true }).partial()

export type SchemaUpdateTenant = z.infer<typeof schemaUpdateTenant>
