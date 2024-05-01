import { PageProps } from '@/types'

type Props = PageProps<'id'>

export default function Page(props: Props) {
  return (
    <>
      <h1>{props.params.id}</h1>
    </>
  )
}
