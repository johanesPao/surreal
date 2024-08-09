"use client";

import { effect, signal } from "@preact-signals/safe-react";
import { IconBrandX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

type XSignInButtonProps = {
  redirectOrigin: string;
};

const loginUsingX = signal(false);

export const XSignInButton = ({ redirectOrigin }: XSignInButtonProps) => {
  effect(() => {
    if (loginUsingX.value) {
      if (typeof window !== "undefined") {
        localStorage.setItem("provider", "twitter");
      }
    }
  });

  return (
    <div
      className='flex gap-2 items-center justify-center w-[300px] py-1.5 border border-stone-800 group cursor-pointer rounded-md shadow-md hover:border-none hover:bg-white hover:text-pitch-black'
      onClick={() => {
        loginUsingX.value = true;
        signIn("twitter", { callbackUrl: redirectOrigin });
      }}
    >
      <IconBrandX size={36} />
      <span>Sign in with Twitter</span>
    </div>
  );
};
