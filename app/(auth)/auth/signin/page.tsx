"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";

import { LinkedInSignInButton } from "@/komponen/tsx/LinkedInSignInButton";
import { XSignInButton } from "@/komponen/tsx/XSignInButton";
import { effect, signal } from "@preact-signals/safe-react";

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
        <div className='flex flex-col w-[400px] py-10 gap-5 items-center bg-cobalt-off-blue border border-cobalt-dusty-blue shadow-2xl font-inconsolata'>
          <text className='text-4xl py-10'>Sign In</text>
          <LinkedInSignInButton redirectOrigin={originalRequestingUrl.value} />
          <span>or</span>
          <XSignInButton redirectOrigin={originalRequestingUrl.value} />
        </div>
        {error && (
          <div className='pt-5 text-red-400 text-sm w-[400px] flex flex-col text-center gap-2'>
            <span>{`An error happened: ${error}`}</span>
            <span>{`You can try signing in again or go back to ${originalRequestingUrl.value}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
