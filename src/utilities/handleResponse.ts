import { toast } from 'sonner'
import { Options } from '@/hooks/useFormAction'
import { CustomResponse } from './request/sendData/types'

type Args<Response extends CustomResponse> = {
  res: Response
} & Options<Response['data']>

export function handleResponse<Response extends CustomResponse>(args: Args<Response>) {
  const { res, showSuccessToast = true, showErrorToast = true, onSuccess, onError } = args

  if (res.ok) {
    onSuccess?.(res.data)
    if (showSuccessToast) toast.success(res.msg)
  } else {
    onError?.()
    if (showErrorToast) toast.error(res.msg)
  }
}
