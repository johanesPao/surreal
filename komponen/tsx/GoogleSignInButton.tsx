'use client'

import { effect, signal } from '@preact-signals/safe-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

type GoogleSignInButtonProps = {
    redirectOrigin: string;
}

const loginUsingGoogle = signal(false)

export const GoogleSignInButton = ({ redirectOrigin }: GoogleSignInButtonProps) => {
    effect(() => {
        if (loginUsingGoogle.value) {
            if (typeof window !== "undefined") {
                localStorage.setItem("provider", "google")
            }
        }
    });

    return (
        <div
        className='flex gap-2 items-center justify-center w-[300px] py-1.5 border border-stone-800 group cursor-pointer rounded-md shadow-md hover:border-none hover:bg-white hover:text-pitch-black'
        onClick={() => {
          loginUsingGoogle.value = true;
          signIn("google", { callbackUrl: redirectOrigin });
        }}
      >
        <IconBrandGoogle size={36} />
        <span>Sign in with Google</span>
      </div> 
    )
}