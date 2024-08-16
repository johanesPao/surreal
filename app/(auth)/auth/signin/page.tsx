"use client";

import { useSearchParams } from "next/navigation";

import { LinkedInSignInButton } from "@/komponen/tsx/LinkedInSignInButton";
import { XSignInButton } from "@/komponen/tsx/XSignInButton";
import { effect, signal } from "@preact-signals/safe-react";
import { GoogleSignInButton } from "@/komponen/tsx/GoogleSignInButton";

const originalRequestingUrl = signal("");

// DON'T REDIRECT PEOPLE HERE!!

const SignInPage = () => {
  const search = useSearchParams();
  const error = search.get("error");

  effect(() => {
    if (typeof window !== "undefined") {
      // get the value of originalUrl in localStorage
      const urlRequestingAuth = localStorage.getItem("urlRequestingAuth");
      // set originalRequestingUrl, if originalUrl is null like
      // in the case of user navigate to this page directly from
      // external site or by typing in address bar, set to '/'
      originalRequestingUrl.value = urlRequestingAuth ? urlRequestingAuth : "/";
    }
  });

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='container px-[5%] lg:px-[30%] flex flex-col items-center'>
        <div className='flex flex-col py-10 gap-4 items-center font-geistSans'>
          <div className="flex flex-col items-center pb-10">
            <text className='text-[2rem]'>Welcome back!</text>
            <text className='text-stone-400 text-[0.8rem] text-center font-thin'>Sign in with your preferred social account.</text>
          </div>
          <LinkedInSignInButton redirectOrigin={originalRequestingUrl.value} />
          <XSignInButton redirectOrigin={originalRequestingUrl.value} />
          <GoogleSignInButton redirectOrigin={originalRequestingUrl.value}/>
        </div>
        {error && (
          <div className='pt-5 text-red-400 text-[0.8rem] flex flex-col text-center gap-2'>
            <span>{`An error happened: ${error}`}</span>
            <span>{`You can try signing in again or go back to ${originalRequestingUrl.value}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
