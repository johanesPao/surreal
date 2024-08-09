"use client";

import { effect, signal } from "@preact-signals/safe-react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

type LinkedInSignInButtonProps = {
  redirectOrigin: string;
};

const loginUsingLinkedIn = signal(false);

export const LinkedInSignInButton = ({
  redirectOrigin,
}: LinkedInSignInButtonProps) => {
  effect(() => {
    if (loginUsingLinkedIn.value) {
      if (typeof window !== "undefined") {
        localStorage.setItem("provider", "linkedin");
      }
    }
  });

  return (
    <div
      className='flex gap-2 items-center justify-center w-[300px] py-1.5 group border border-stone-800 cursor-pointer rounded-md shadow-md hover:border-none hover:bg-white hover:text-pitch-black'
      onClick={() => {
        loginUsingLinkedIn.value = true;
        signIn("linkedin", { callbackUrl: redirectOrigin });
      }}
    >
      <IconBrandLinkedin size={36} />
      <span>Sign in with LinkedIn</span>
    </div>
  );
};
