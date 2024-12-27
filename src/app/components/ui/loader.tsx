import { Loader2 } from 'lucide-react'

export function Loader({ size = "default" }: { size?: "default" | "sm" | "lg" }) {
  const sizeClasses = {
    default: "w-8 h-8",
    sm: "w-4 h-4",
    lg: "w-12 h-12"
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
  )
}

