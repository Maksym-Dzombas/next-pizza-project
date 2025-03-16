"use client";

import { Textarea } from "@/components/ui"
import { useFormContext } from "react-hook-form"
import { ClearButton } from "../clear-button"

interface Props {
  name: string
  label?: string
  required?: boolean
  rows?: number
  placeholder?: string
  className?: string
}

export const FormTextarea: React.FC<Props> = ({ name, label, required, rows, placeholder, className, ...props }) => {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const errorText = errors?.[name]?.message as string;
  const text = watch(name);

  const onClickClear = () => {
    setValue(name, "");
  }

  return (
    <div>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="relative">
        <Textarea rows={rows} placeholder={placeholder} className="h-12 text-md" {...register(name)} {...props} />
      </div>

      {text && <ClearButton onClick={onClickClear} />}

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  )
}