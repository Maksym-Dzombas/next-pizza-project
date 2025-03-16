import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { ErrorText } from '../error-text';
import React from 'react';

interface Props {
  errorText?: string
  error?: boolean
  onChange?: (value?: string) => void
}

const API_KEY_DADATA = process.env.NEXT_PUBLIC_API_KEY_DADATA || "";

export const AdressInput: React.FC<Props> = ({ error, errorText, onChange }) => {
  return (
    <div>
      <AddressSuggestions token={API_KEY_DADATA} onChange={(data) => onChange?.(data?.value)} />
      {error && errorText && <ErrorText className='mt-2' text={errorText} />}
    </div>
  )
}