export default function SkeltonInput({className = "w-20"}: {className?: string}) {
    return (
      <div className={`h-4 bg-foreground25 animate-pulse rounded-md ${className}`}></div>
    )
  }