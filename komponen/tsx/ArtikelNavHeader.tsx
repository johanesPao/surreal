"use client";

import {
  IconLogin2,
  IconMenu,
  IconX,
} from "@tabler/icons-react";
import { opsiStringDate } from "@/app/_interface-props/_format.props";

import NavLayout from "@/komponen/tsx/NavLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FrontMatterArtikel } from "@/app/_types/frontmatter";
import { Session } from "next-auth";
import { signal, effect } from "@preact-signals/safe-react";
import Image from "next/image";
import SignInWrapperComp from "./SignInWrapperComp";
import UserNavLayout from "./UserNavLayout";
import { getUserId } from "@/app/api/db/user";
import { InferAccount } from "@/schema";
import { useEffect } from "react";
import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";

type ArticleNavHeaderProps = {
  frontMatter: FrontMatterArtikel;
  session: Session | null;
};

const navOpen = signal(false);
const userNavOpen = signal(false);
const initiateSignIn = signal(false);
const userId = signal<string|undefined>(undefined)

const ArticleNavHeader = ({ frontMatter, session }: ArticleNavHeaderProps) => {
  const [diDesktop] = useDesktopOrMobile()
  const iconSize = diDesktop ? 16 : 14;
  const navAvatarSize = diDesktop ? 32 : 22;

  effect(() => {
    if (initiateSignIn.value) {
      if (typeof window !== "undefined") {
        localStorage.setItem("urlRequestingAuth", window.location.href);
      }
    }
  });

  useEffect(() => {
    if (session) {
      const getUser = async () => {
        const user = await getUserId(
          session.user.provider as InferAccount['provider'],
          session.user.id
        )
        if (user) {
          userId.value = user
        }
      }
    
      getUser()
    }
  })

  return (
    <motion.div className="relative">
      <motion.div
        className='fixed top-0 left-0 w-screen z-[52] flex flex-col px-[5%] lg:px-[2.5%] py-1.5 bg-chinese-black justify-between items-baseline shadow-xl'
        initial={{
          y: -40,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.1,
          type: "spring",
          stiffness: 80,
          damp: 200,
          ease: "linear",
        }}
      >
        <div className='w-full flex flex-grow items-center py-1'>
          <div
            className='flex gap-1 cursor-pointer'
            onMouseDown={() => (navOpen.value = !navOpen.value)}
          >
            {navOpen.value ? <IconX size={iconSize}/> : <IconMenu size={iconSize} />}
          </div>
          <div className='flex flex-col flex-grow items-center'>
            <p className='text-[1rem] font-bold font-monaspaceKrypton'>{frontMatter.title}</p>
            <p className='lg:text-[0.6rem] hidden lg:block font-monaspaceArgon' suppressHydrationWarning>
              {new Intl.DateTimeFormat("en-ID", opsiStringDate).format(
                new Date(frontMatter.createdAt)
              )}
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            {session?.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || ""}
                width={navAvatarSize}
                height={navAvatarSize}
                className='rounded-full cursor-pointer'
                onClick={() =>
                  userNavOpen.value = !userNavOpen.value
                }
              />
            ) : (
              <SignInWrapperComp>
                <IconLogin2 />
              </SignInWrapperComp>
            )}
          </div>
        </div>
        <AnimatePresence mode='wait'>
          {navOpen.value && <NavLayout />}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {(userNavOpen.value && session) ? (
            <UserNavLayout
              session={session?.user}
              userId={userId.value}
            />
          ) : undefined
        }
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticleNavHeader;
