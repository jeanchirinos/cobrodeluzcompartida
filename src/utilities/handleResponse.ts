import { toast } from 'sonner'
import { CustomResponse } from './request/sendData/types'

type Args<Response extends CustomResponse<ResponseData>, ResponseData> = {
  res: Response
} & Options<ResponseData>

export async function handleResponse<Response extends CustomResponse<ResponseData>, ResponseData>(
  args: Args<Response, ResponseData>,
) {
  const { res, showSuccessToast = true, showErrorToast = true, onSuccess, onError } = args

  if (!res) return

  if (res.ok) {
    await onSuccess?.(res.data)
    if (showSuccessToast) toast.success(res.msg)
  } else {
    onError?.()
    if (showErrorToast) toast.error(res.msg)
  }
}

export type Options<ResponseData> = {
  // onSuccess?: ResponseData extends undefined ? () => Promise<void> | void : (data: ResponseData) => Promise<void> | void
  onSuccess?: (data: ResponseData) => Promise<void> | void
  showSuccessToast?: boolean
  onError?: () => void
  showErrorToast?: boolean
}
