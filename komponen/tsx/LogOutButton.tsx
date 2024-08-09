'use client'

import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <div
      className="w-full flex flex-col border border-red-900 bg-red-900 rounded-md items-center py-1 group cursor-pointer hover:bg-red-600 hover:text-black"
      onClick={() => signOut()}
    >
      <span>Log out</span>
    </div>
  )
}

export default LogOutButton;
