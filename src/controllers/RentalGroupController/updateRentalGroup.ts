'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function updateRentalGroup(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
  })

  return sendData({
    url: `rental-group-update/${formData.get('id')}`,
    schema,
    body: formData,
    revalidateTagParams: ['rental-group'],
  })
}
