import { Skeleton as CardSkeleton } from '../governor-card/skeleton'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={className}>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
)
