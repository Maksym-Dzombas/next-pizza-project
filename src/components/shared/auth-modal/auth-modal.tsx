import { Button, Dialog, DialogContent } from '@/components/ui'
import { signIn } from 'next-auth/react'
import React from 'react'
import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'
import toast from 'react-hot-toast'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [typeAuth, setTypeAuth] = React.useState<'login' | 'register'>('login');

  const authGitHub = async () => {
    try {
      await signIn("github", { callbackUrl: "/", redirect: true })
      return toast.success("Успешный вход в аккаунт");
    } catch (error) {
      console.error("[GITHUB AUTH]: ", error);
      return toast.error("Ошибка при входе в аккаунт");
    }
  };

  const authGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/", redirect: true })
      return toast.success("Успешный вход в аккаунт");
    } catch (error) {
      console.error("[GOOGLE AUTH]: ", error);
      return toast.error("Ошибка при входе в аккаунт");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[450px] bg-white p-10'>
        {typeAuth === 'login' ? (
          <LoginForm onClose={onClose} />
        ) : <RegisterForm onClose={onClose} />}
        <hr />
        <div className='flex gap-2'>
          <Button
            variant={'secondary'}
            onClick={authGitHub}
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle w-6 h-6">
              <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
            </svg>
            GitHub
          </Button>
          <Button
            variant={'secondary'}
            onClick={authGoogle}
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Google
          </Button>
        </div>
        <Button variant={"outline"} onClick={() => setTypeAuth(typeAuth => typeAuth === 'login' ? 'register' : 'login')} className='w-full mt-4'>{typeAuth !== "login" ? "Есть аккаунт? Войти" : "Нету аккаунта? Регистрация"}</Button>
      </DialogContent>
    </Dialog >
  )
}