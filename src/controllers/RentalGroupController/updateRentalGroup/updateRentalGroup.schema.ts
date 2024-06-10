import { z } from 'zod'

export const schemaUpdateRentalGroup = z.object({
  name: z.string().min(1, { message: 'Ingresa un nombre válido' }),
})

export const schemaUpdateRentalGroupWithRefine = (args: { currentGroupName: string }) =>
  schemaUpdateRentalGroup.refine(data => data.name.trim() !== args.currentGroupName)
