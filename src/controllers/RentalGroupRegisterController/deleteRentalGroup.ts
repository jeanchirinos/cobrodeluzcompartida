'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function deleteRentalGroupRegister(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string(),
  })

  return sendData({
    url: `rental-group-register-delete/${formData.get('id')}`,
    schema,
    body: formData,
    revalidateTagParams: ['rental-group-register'],
  })
}
