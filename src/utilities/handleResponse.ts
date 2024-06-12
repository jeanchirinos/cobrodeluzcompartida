import { toast } from 'sonner'
import { Options } from '@/hooks/useFormAction'

type PossibleResponse = { ok: boolean; msg: string; data: any }

export function handleResponse<ResponseType extends PossibleResponse>(
  res: ResponseType,
  options?: Options<ResponseType>,
) {
  const { showSuccessToast = true, onSuccess, onError, showErrorToast = true } = options ?? {}

  if (!res) return

  if (res.ok) {
    onSuccess?.(res.data)

    if (showSuccessToast) {
      toast.success(res.msg)
    }
  } else {
    onError?.()

    if (showErrorToast) {
      toast.error(res.msg)
    }
  }
}
