"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { SearchInput } from './search-input'
import Link from 'next/link'
import { CartButton } from './cart-button'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useSession, signIn } from 'next-auth/react'
import { ProfileButton } from './profile-button';
import { AuthModal } from './auth-modal/auth-modal'

type Props = {
  hasCart?: boolean
  hasSearch?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Ваш заказ успешно оплачен. Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Ваш аккаунт успешно верифицирован.";
    }

    if (toastMessage) {
      router.replace("/");
      setTimeout(() => {
        toast.success(toastMessage);
      }, 1000);
    }
  }, []);

  return (
    <header className={cn("", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Logo */}
        <Link href={"/"}>
          <div className='flex items-center gap-4'>
            <Image src={"/pizza.png"} alt='logo' width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>
        {hasSearch && <SearchInput />}
        {/* Nav */}
        <div className='flex gap-3'>
          <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          <ProfileButton onClickModal={() => setModalOpen(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}