export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type PagePropsParams<Params extends string> = {
  params: Record<Params, string>
}

export type SearchParamsProps<SearchParams> = Partial<Record<SearchParams, string>>
export type ParamsProps<Params> = Record<Params, string>

export type RouteId = string | number
