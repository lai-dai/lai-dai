import { LoaderCircle, type LucideProps } from "lucide-react"
import { cn } from "~/lib/utils"

export function Loader({ className, ...props }: LucideProps) {
  return <LoaderCircle
    className={cn("animate-spin size-5", className)}
    {...props} />
}
