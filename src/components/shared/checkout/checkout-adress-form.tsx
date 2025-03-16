"use client";

import { WhiteBlock } from "./white-block"
import { cn } from "@/lib/utils"
import { FormTextarea } from "../form-components"
import { AdressInput } from "../form-components/adress-input"
import { Controller, useFormContext } from "react-hook-form"

interface Props {
  className?: string
  contentClassName?: string
}

export const CheckoutAdressForm: React.FC<Props> = ({ className, contentClassName }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock className={cn("", className)} contentClassName={cn("", contentClassName)} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => {
            return (
              <AdressInput error={Boolean(fieldState.error)} errorText={fieldState.error?.message} onChange={field.onChange} />
            )
          }}
        />
        <FormTextarea name="comment" rows={10} className="text-base" placeholder="Комментарий к заказу" />
      </div>
    </WhiteBlock>
  )
}