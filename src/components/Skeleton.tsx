import { cnx } from '@/lib/utils'
import { Skeleton as NextuiSkeleton, SkeletonProps as NextuiSkeletonProps } from '@nextui-org/react'

type SkeletonProps = NextuiSkeletonProps & {
  isLoading: boolean
  chars?: number
}

export function Skeleton(props: SkeletonProps) {
  const { isLoading, classNames, chars, ...restProps } = props

  function getRandomWord() {
    const letters = Array.from({ length: chars ?? 0 }, () => '0')
    return letters.join('')
  }

  return (
    <NextuiSkeleton
      classNames={{
        ...classNames,
        base: cnx('before:hidden', classNames?.base),
      }}
      isLoaded={!isLoading}
      {...restProps}
    >
      {chars && isLoading ? getRandomWord() : props.children}
    </NextuiSkeleton>
  )
}
