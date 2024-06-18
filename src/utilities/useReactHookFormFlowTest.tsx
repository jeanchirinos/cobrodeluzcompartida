import { ZodType, z } from 'zod'
import { User } from '@/models/User'

//?
type Config<Body> = Omit<RequestInit, 'body'> &
  (Body extends undefined ? { body?: undefined } : { body: Body }) & { method?: 'POST' | 'PUT' | 'DELETE' }

//?
type CustomResponse<ResponseData> = { msg: string } & (
  | {
      ok: true
      data: ResponseData
    }
  | {
      ok: false
      data: null
    }
)

//?
export type DefaultArgs<ResponseData, BodySchema extends ZodType> = {
  config?: Config<z.infer<BodySchema>>
  options?: {
    schema?: BodySchema
  } & Pick<Options<ResponseData>, 'onSuccess'>
}

//?
export async function newSendData<ResponseData, BodySchema extends ZodType>(
  args: DefaultArgs<ResponseData, BodySchema>,
): Promise<CustomResponse<ResponseData>> {
  const res = await fetch('')
  const data = await res.json()

  if (res.ok) {
    return {
      ok: true,
      data,
      msg: 'Success',
    }
  } else {
    return {
      ok: false,
      data: null,
      msg: 'Error',
    }
  }
}
//?
export type Options<ResponseData> = {
  onSuccess?: ResponseData extends undefined ? () => Promise<void> | void : (data: ResponseData) => Promise<void> | void
  // onSuccess?:  (data: ResponseData) => Promise<void> | void
  showSuccessToast?: boolean
  onError?: () => void
  showErrorToast?: boolean
}

// 2
export function useReactHookForm<ActionArgs, ResponseData, FormSchema extends ZodType>(props: {
  //! Required if needs response type for options
  action?: (data: ActionArgs) => Promise<CustomResponse<ResponseData>>
  actionProps?: Options<ResponseData>
  schema: FormSchema
  //! submitActionFn is required only if FormSchema is not equal to action schema OR action function args are different from FormSchema
  submitActionFn?: (data: any) => Promise<CustomResponse<ResponseData>>
}) {
  const { action, actionProps, submitActionFn } = props

  async function asas(dat: z.infer<FormSchema>) {
    const res = (await submitActionFn?.(dat)) ?? (await action?.(dat))

    if (!res) return

    handleResponse({
      res,
      ...actionProps,
    })
  }
}

// 3
function HelloWorld() {
  useReactHookForm({
    action: login,
    schema: schemaLoginForm,
    submitActionFn: data => login({ ...data }),
    actionProps: {
      onSuccess(data) {},
    },
  })
}

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const schemaLoginForm = z.object({
  email: z.string().email(),
})

type ArgsLoginFn = z.infer<typeof schemaLogin> & { hola: string }
// type ArgsLoginFn = z.infer<typeof schemaLogin>
type ResponseLogin = Pick<User, 'token'>

export async function login(args: ArgsLoginFn) {
  const { hola, ...restArgs } = args

  return newSendData<ResponseLogin, typeof schemaLogin>({
    // return newSendData({
    // config: {},

    options: {
      // schema: schemaLogin,
      // schema: schemaLogin,
      // schema: schemaLogin,
      // onSuccess(data) {
      //   console.log(data.token)
      // },
    },
  })
}

// type Args<Response> = {
//   res: Response
// } & Options<Response extends CustomResponse<infer Y> ? Y : never>

type Args<Response extends CustomResponse<ResponseData>, ResponseData> = {
  res: Response
} & Options<ResponseData>

export function handleResponse<Response extends CustomResponse<ResponseData>, ResponseData>(
  args: Args<Response, ResponseData>,
) {
  const { res, showSuccessToast = true, showErrorToast = true, onSuccess, onError } = args

  if (res.ok) {
    onSuccess?.(res.data)
    // if (showSuccessToast) {
    // }
  } else {
    onError?.()
    // if (showErrorToast) {
    // }
  }
}
