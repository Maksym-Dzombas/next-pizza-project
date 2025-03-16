import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { loginSchema, LoginValues } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '../../title'
import { FormInput } from '../../form-components'
import { Button } from '@/components/ui'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

type Props = {
  onClose?: () => void
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/'
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("Вы успешно вошли в аккаунт");
      onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]:", error);
      toast.error("Ошибка входа в аккаунт");
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}