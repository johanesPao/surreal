'use client'

import { Session } from "next-auth";
import UserNavMenu from "./UserNavMenu";
import UserAccountNav from "./UserAccountNav";

type UserNavLayoutProps = {
  session: Session['user'];
  userId: string | undefined;
}

const UserNavLayout = ({session, userId}: UserNavLayoutProps) => {
  console.log(session);
  return (
    <div className="flex flex-col p-4 bg-stone-900 text-white fixed top-16 right-4 rounded-lg z-[53] shadow-lg gap-8">
      <UserAccountNav userId={userId} session={session}/>
      <UserNavMenu />
    </div>
  )
}

export default UserNavLayout
