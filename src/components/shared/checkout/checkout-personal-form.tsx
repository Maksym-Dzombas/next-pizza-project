import { Input } from "@/components/ui/input"
import { WhiteBlock } from "./white-block"
import { FormInput } from "../form-components/form-input"
import { cn } from "@/lib/utils"

interface Props {
  className?: string
  contentClassName?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className, contentClassName }) => {
  return (
    <WhiteBlock className={cn("", className)} contentClassName={cn("", contentClassName)} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" placeholder="Телефон" className="text-base" />
      </div>
    </WhiteBlock>
  )
}