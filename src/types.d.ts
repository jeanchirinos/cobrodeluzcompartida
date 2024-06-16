export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type PagePropsParams<Params extends string> = {
  params: Record<Params, string>
}

export type CustomPageProps<Params = {}, SearchParams = {}> = {
  params: Record<Params, string>
  searchParams: Record<SearchParams, string | undefined>
}

export type PageSearchParamsProps<SearchParams> = {
  searchParams: Record<SearchParams, string | undefined>
}

export type PageSearchParamsProps2<SearchParams2> = {
  searchParams: SearchParams2
}

export type SearchParamsProps<SearchParams> = Partial<Record<SearchParams, string>>
export type ParamsProps<Params> = Record<Params, string>

export type PageParamsAndSearchParamsPropsAlt<Params = {}, SearchParams = {}> = {
  params: Record<Params, string>
  searchParams: SearchParams
}

export type RouteId = string | number
