import { ErrorResponse } from './types'

export function getErrorResponse({ message }: { message: string }): ErrorResponse {
  return { ok: false, msg: message, data: null }
}
