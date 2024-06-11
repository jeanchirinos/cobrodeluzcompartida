import { RentalGroup, schemaRentalGroup } from '@/models/RentalGroup'

export const schemaUpdateRentalGroup = schemaRentalGroup.omit({ id: true })

export const schemaUpdateRentalGroupWithRefine = (args: {
  currentGroupName: RentalGroup['name']
}) => schemaUpdateRentalGroup.refine(data => data.name.trim() !== args.currentGroupName)
