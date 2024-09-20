import useSWRMutationDefault, { SWRMutationConfiguration } from 'swr/mutation'
import { AsyncReturnType } from 'type-fest'

type AsyncFunction = (...arguments_: any[]) => Promise<any>

type Args<T extends AsyncFunction> = {
  key: string
  fn: T
  options?: SWRMutationConfiguration<AsyncReturnType<T>, any, string, Parameters<T>[0]>
}

export function useSWRMutation<T extends AsyncFunction>(args: Args<T>) {
  const { key, fn, options } = args

  return useSWRMutationDefault<AsyncReturnType<T>, any, string, Parameters<T>[0]>(
    key,
    (url, { arg }) => fn(arg),
    options,
  )
}
