import { ProfileForm } from '@/components/shared/profile-form';
import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const ProfilePage = async ({ }: Props) => {
  const userSession = await getUserSession();

  if (!userSession) {
    return redirect("/not-authorized");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userSession.id)
    }
  });

  console.log(user);

  if (!user) {
    return redirect("/not-authorized");
  }

  return (
    <ProfileForm data={user} />
  )
}

export default ProfilePage;