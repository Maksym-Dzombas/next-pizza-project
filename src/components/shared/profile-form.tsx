"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { updateSchema, UpdateValues } from './auth-modal/forms/schemas'
import { User } from '@prisma/client'
import toast from 'react-hot-toast'
import { Container } from './container'
import { Title } from './title'
import { FormInput } from './form-components'
import { Button } from '../ui'
import { signOut } from 'next-auth/react'
import { updateUserInfo } from '../../../actions';

type Props = {
  data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: UpdateValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password
      });

      toast.success("Данные успешно обновлены");
    } catch (error) {
      toast.error("Ошибка при обновлении данных");
      console.error("[UPDATE USER DATA]: ", error);
    }
  };

  const onLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      return toast.success("Вы успешно вышли из аккаунта");
    } catch (error) {
      console.error("[LOGOUT]: ", error);
      return toast.error("Ошибка при выходе из аккаунта");
    }
  }

  return (
    <Container className='my-10'>
      <Title text={`Личные данные`} size='md' className='font-bold' />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onLogout}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}