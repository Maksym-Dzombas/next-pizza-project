import { CircleUser, User } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import { Button } from '../ui';
import Link from 'next/link';

type Props = {
  onClickModal: () => void
}

export const ProfileButton: React.FC<Props> = ({ onClickModal }) => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <Button onClick={onClickModal} variant="outline" className="flex items-center gap-1">
          <User size={20} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  )
}