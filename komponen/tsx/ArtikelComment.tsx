"use client";

import { Session } from "next-auth";
import Image from 'next/image';
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";
import { signal } from "@preact-signals/safe-react";
import { AnimatePresence, motion } from 'framer-motion';
import { IconMessage2, IconSquareRoundedX } from "@tabler/icons-react";

type ArtikelCommentProps = {
  session: Session | null;
  artikelId: string;
};

const commentNavOpen = signal(false)

const ArtikelComment = ({ session, artikelId }: ArtikelCommentProps) => {
  return (
    <div className="fixed top-[45%] right-0 flex h-[calc(100%-45%-42px)]">
      <div
        className="relative top-[85%] w-[60px] h-[40px] px-2 place-content-center cursor-pointer"
        onClick={() => commentNavOpen.value = true}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeOut"
          }}
        >
          <IconMessage2 className="text-green-500"/>
        </motion.span>
      </div>
      <AnimatePresence mode="wait">
        {commentNavOpen.value && (
            <motion.div 
              className="w-screen h-full bg-stone-900/100"
              initial={{x: "100%"}}
              animate={{x: 0}}
              exit={{x: "100%"}}
              transition={{
                ease: "easeInOut",
                duration: 1,
                type: 'spring',
                damping: 20,
                
              }}
            >
              <div className="relative flex flex-col w-full h-full">
                {!session ? (
                  <div className="flex flex-col w-full h-full text-[11px] items-center place-content-center">
                    <div className="flex gap-2 items-center">
                      <span>
                        You need to
                      </span>
                      <div className="bg-pitch-black rounded-md p-2 hover:scale-105 transition-all group">
                        <Link
                          href={{
                            pathname: "/auth/signin",
                            query: { originUrl: "/artikel/arrays-in-excel" },
                          }}
                        >
                          login
                        </Link>
                      </div>
                      <span>
                        first to comment
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col p-2 gap-2">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={session.user.image as string}
                        alt={session.user.name as string}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="flex flex-col font-wotfard">
                        <span>{session.user.name}</span>
                        <span className="text-[9px] text-gray-400">{`using ${session.user.provider}`}</span>
                      </div>
                    </div>
                    <hr className="border-stone-700"/>
                    <RichTextEditor userSession={session.user} artikelId={artikelId}/>
                  </div>
                )}
                <span 
                  className="absolute top-[10px] right-[10px] text-red-700 cursor-pointer"
                  onClick={() => commentNavOpen.value = false}
                >
                  <IconSquareRoundedX />
                </span>
              </div>
              {/* <span onClick={() => commentNavOpen.value = false}>X</span> */}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
    // <div className='px-[5%] lg:px-[20%] pt-5 w-full flex flex-col gap-3'>
    //   {!session ? (
    //     <Link
    //       href={{
    //         pathname: "/auth/signin",
    //         query: { originUrl: "/artikel/arrays-in-excel" },
    //       }}
    //       className="shadow-2xl"
    //     >
    //       Sign in to leave a comment
    //     </Link>
    //   ) : (
    //     <div className="w-full bg-stone-900 p-4 shadow-xl shadow-pitch-black/10 rounded-md">
    //       <RichTextEditor userSession={session.user} artikelId={artikelId}/>
    //     </div>
    //   )}
    //   <span className="text-[12px]">Comment List</span>
    // </div>
  );
};

export default ArtikelComment;
