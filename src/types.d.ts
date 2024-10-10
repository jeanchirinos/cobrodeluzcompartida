export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type RouteId = string | number

export type PagePropsParams<Params extends string> = {
  params: Record<Params, string>
}
