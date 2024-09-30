import { Skeleton as NextuiSkeleton, SkeletonProps as NextuiSkeletonProps } from '@nextui-org/react'

type SkeletonProps = NextuiSkeletonProps & {
  isLoading?: boolean
  chars?: number
}

export function Skeleton(props: SkeletonProps) {
  const { isLoading, chars, ...restProps } = props

  function getRandomWord() {
    const letters = Array.from({ length: chars ?? 0 }, () => '-')
    return letters.join('')
  }

  return (
    <NextuiSkeleton isLoaded={isLoading !== undefined && !isLoading} {...restProps}>
      {chars && isLoading ? getRandomWord() : props.children}
    </NextuiSkeleton>
  )
}
