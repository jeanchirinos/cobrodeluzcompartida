import { toast } from 'sonner'
// import { sendData } from './actionRequest'
import { Options } from '@/hooks/useFormAction'

//TODO: Remove @ts-ignore
// export function handleResponse(res: Awaited<ReturnType<typeof sendData>>, options?: Options) {
export function handleResponse<Response>(res: Response, options?: Options<Response>) {
  const { showSuccessToast = false, onSuccess, onError, showErrorToast = true } = options ?? {}

  if (!res) return

  //@ts-ignore
  if (res.ok) {
    //@ts-ignore
    onSuccess?.(res.data)

    if (showSuccessToast) {
      // @ts-ignore
      toast.success(res.msg)
    }
  } else {
    onError?.()

    if (showErrorToast) {
      // @ts-ignore
      toast.error(res.msg)
    }
  }
}
