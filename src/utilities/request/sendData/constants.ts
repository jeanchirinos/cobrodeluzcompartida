import { ErrorResponse } from './types'

export function getErrorResponse(args?: { message: string }): ErrorResponse {
  const { message = 'Error en la petición' } = args ?? {}

  return { ok: false, msg: message, data: null }
}
