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
      className='flex gap-2 items-center justify-center bg-[#0a66c2] w-[300px] py-1 group cursor-pointer rounded-sm shadow-md'
      onClick={() => {
        loginUsingLinkedIn.value = true;
        signIn("twitter", { callbackUrl: redirectOrigin });
      }}
    >
      <IconBrandLinkedin size={36} />
      <span>Sign In with LinkedIn</span>
    </div>
  );
};
