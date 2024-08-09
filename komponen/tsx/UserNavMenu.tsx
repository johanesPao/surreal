'use client'

import LogOutButton from "./LogOutButton";

const UserNavMenu = () => {
  return (
    <div className="flex flex-col gap-12 items-center text-stone-400 text-sm">
      <div className="flex flex-col gap-3 items-center">
        <span>Comments</span>
        <span>Social accounts</span>
      </div>
      <LogOutButton />
    </div>
  );
};

export default UserNavMenu;
