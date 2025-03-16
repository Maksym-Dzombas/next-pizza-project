import React from 'react';
import { Checkbox } from '../ui/checkbox';

export interface FilterChecboxProps {
  name: string;
  value?: string;
  id: number;
  endAdornment?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
  name,
  id,
  endAdornment,
  onCheckedChange,
  checked,
  value
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={id}
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${String(name)}-${String(id)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(id)}`}
        className="leading-none cursor-pointer flex-none">
        {name}
      </label>
      {endAdornment}
    </div>
  );
};
