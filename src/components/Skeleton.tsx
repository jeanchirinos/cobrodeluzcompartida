import { cnx } from '@/lib/utils'
import { Skeleton as NextuiSkeleton, SkeletonProps as NextuiSkeletonProps } from '@nextui-org/react'

type SkeletonProps = NextuiSkeletonProps & {
  isLoading?: boolean
  chars?: number
}

export function Skeleton(props: SkeletonProps) {
  const { isLoading = true, chars = 0, children, classNames, ...restProps } = props

  function getRandomWord() {
    const letters = Array.from({ length: chars }, () => '-')
    const word = letters.join('')

    return word
  }

  const isLoaded = !isLoading

  return (
    <NextuiSkeleton
      isLoaded={isLoaded}
      classNames={{ base: cnx(classNames?.base, isLoading && 'text-transparent') }}
      {...restProps}
    >
      {chars > 0 && isLoading ? getRandomWord() : children}
    </NextuiSkeleton>
  )
}
