"use client";

// import useLocateSignIn from "@/app/_lib/_hooks_wrapper/useLocateSignIn";
import { effect, signal } from "@preact-signals/safe-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const signInInitiated = signal(false);

const SignInWrapperComp = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  effect(() => {
    if (signInInitiated.value) {
      if (typeof window !== "undefined") {
        localStorage.setItem("urlRequestingAuth", window.location.href);
      }
    }
  });

  return (
    <div
      onClick={() => {
        signInInitiated.value = true;
        router.push("/auth/signin");
      }}
      className='cursor-pointer'
    >
      {children}
    </div>
  );
};

export default SignInWrapperComp;
