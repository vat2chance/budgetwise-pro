import Image from 'next/image'

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      <Image 
        src="/logo.svg" 
        alt="BudgetWise Pro" 
        width={32} 
        height={32} 
        className={className}
        priority
      />
    </div>
  )
}
