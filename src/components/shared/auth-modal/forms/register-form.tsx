import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { registerSchema, RegisterValues } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '../../title'
import { FormInput } from '../../form-components'
import { Button } from '@/components/ui'
import toast from 'react-hot-toast'
import { registerUser } from '../../../../../actions'

type Props = {
  onClose?: () => void
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });

      toast.success("Регистрация успешна. Осталось подтвердить свою почту.");
      onClose?.();
    } catch (error) {
      console.error("Error [REGISTER]:", error);
      toast.error("Ошибка регистрации аккаунта");
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Регистрация аккаунта" size="md" className="font-bold" />
            <p className="text-gray-400">Зарегистрируйтесь, что бы иметь свой аккаунт</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="ФИО" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтверждение пароля" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  )
}