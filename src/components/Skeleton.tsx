import { cnx } from '@/lib/utils'
import { Skeleton as HerouiSkeleton, SkeletonProps as HerouiSkeletonProps } from '@heroui/react'

type SkeletonProps = HerouiSkeletonProps & {
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
    <HerouiSkeleton
      isLoaded={isLoaded}
      classNames={{
        base: cnx(classNames?.base, isLoading && 'text-transparent rounded-sm'),
        content: cnx(classNames?.base, isLoading && 'line-clamp-1'),
      }}
      {...restProps}
    >
      {chars > 0 && isLoading ? getRandomWord() : children}
    </HerouiSkeleton>
  )
}
