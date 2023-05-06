import { Skeleton as CardSkeleton } from '../governor-card/skeleton'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={className}>
    {Array(12)
      .fill(0)
      .map((_, index) => (
        <CardSkeleton key={index} />
      ))}
  </div>
)
