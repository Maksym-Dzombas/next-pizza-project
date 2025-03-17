import { ReactNode } from "react"

interface PriceDetails {
  title: ReactNode
  value: ReactNode
  icon?: ReactNode
  className?: string
}

export const PriceDetails: React.FC<PriceDetails> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center my-4">
      {icon}
      <span className="flex flex-1 text-lg text-neutral-500 ml-2">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  )
}