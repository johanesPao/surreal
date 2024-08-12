'use client'

import { IconBrandGoogle, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { Session } from "next-auth";

type UserAccountNavProps = {
  userId: string | undefined,
  session: Session['user']
}

const UserAccountNav = ({ userId, session }: UserAccountNavProps) => {
  let icon: React.ReactElement | undefined = undefined;
  switch (session.provider) {
    case "linkedin":
      icon = <IconBrandLinkedin/>
    case "twitter":
      icon = <IconBrandX />
    case "google":
      icon = <IconBrandGoogle />
  }
  return (
    <div
      className="flex flex-col gap-1 items-center"
    >
      <span className="text-[20px] font-bold font-monaspaceArgon">Account Details</span>
      <span className="text-xs text-stone-500">{userId}</span>
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          {icon}
          <span>{session.name}</span>
        </div>
        {session.provider === 'twitter' && (
          <span className="text-sm text-stone-500 italic">{`@${session.handleName}`}</span>
        )}
      </div>
    </div>
  )
}

export default UserAccountNav;
