'use client'

import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <div
      className="w-full flex flex-col border border-red-900 bg-red-900 rounded-md items-center py-1"
      onClick={() => signOut()}
    >
      <span>Log out</span>
    </div>
  )
}

export default LogOutButton;
