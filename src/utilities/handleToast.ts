import { toast } from 'sonner'
import { type CustomResponse } from './request/sendData/types'

export type ShowToastArgs<Response extends CustomResponse<unknown>> = {
  res: Response
  showSuccessToast?: boolean
  showErrorToast?: boolean
}

export function handleToast<Response extends CustomResponse<unknown>>(args: ShowToastArgs<Response>) {
  const { res, showSuccessToast = true, showErrorToast = true } = args

  if (res.ok) {
    showSuccessToast && toast.success(res.msg)
  } else {
    showErrorToast && toast.error(res.msg)
  }
}
