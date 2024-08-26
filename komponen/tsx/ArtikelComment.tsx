"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";
import { effect, signal } from "@preact-signals/safe-react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMessage2, IconSquareRoundedX } from "@tabler/icons-react";
import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";
import { createComment, getCommentByArticleID } from "@/app/api/db/comment";
import { TInsertCommentData } from "@/app/_types/query";
import { InferAccount, InferComment } from "@/schema";
import CommentList from "./CommentList";
import NoComments from "./NoComments";
import { useEffect } from "react";
import CommentSection from "./CommentSection";

type ArtikelCommentProps = {
  session: Session | null;
  artikelId: string;
};

const commentNavOpen = signal(false);
const commentContent = signal("");
const postButton = signal(false);
const characterCount = signal(0);
const wordCount = signal(0);
const charThresholdColor = signal<
  "text-green-500" | "text-orange-500" | "text-red-500"
>("text-green-500");
const commentList = signal<InferComment[]>([]);

const ArtikelComment = ({ session, artikelId }: ArtikelCommentProps) => {
  const [diDesktop] = useDesktopOrMobile();
  const characterLimit = 5000;

  const getComments = async () => {
    const comments = await getCommentByArticleID(artikelId);
    if (comments) {
      commentList.value = comments;
    }
  };

  const postComment = async () => {
    if (session) {
      console.log(typeof commentContent.value);
      try {
        console.log(session);
        const commentData: TInsertCommentData = {
          provider: session.user.provider as InferAccount["provider"],
          providerId: session.user.id,
          articleId: artikelId,
          content: commentContent.value,
        };
        const postComment = await createComment(JSON.stringify(commentData));
        if (postComment) {
          console.log(`postComment is ${postComment}`);
          commentNavOpen.value = false;
          getComments();
        }
      } catch (kesalahan) {
        console.log(kesalahan);
      }
    }
  };

  effect(() => {
    const remainingChar = characterLimit - characterCount.value;
    const percentageLeft = remainingChar / characterLimit;
    percentageLeft > 0.5
      ? (charThresholdColor.value = "text-green-500")
      : percentageLeft > 0
        ? (charThresholdColor.value = "text-orange-500")
        : (charThresholdColor.value = "text-red-500");
  });

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <CommentSection comments={commentList.value} />
      <div
        className={`fixed top-[45%] right-0 flex ${diDesktop ? "h-[calc(100%-45%)] z-[54]" : "h-[calc(100%-45%-42px)]"}`}
      >
        <div
          className={`relative ${diDesktop ? "top-[90%]" : "top-[85%]"} w-[60px] h-[40px] px-2 place-content-center cursor-pointer`}
          onClick={() => (commentNavOpen.value = true)}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeOut",
            }}
          >
            <IconMessage2 className="text-green-500" />
          </motion.span>
        </div>
        <AnimatePresence mode="wait">
          {commentNavOpen.value && (
            <motion.div
              className="w-screen h-full bg-stone-900/100 px-[5%] lg:px-[2.5%] py-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                ease: "easeInOut",
                duration: 1,
                type: "spring",
                damping: 20,
              }}
            >
              <div className="relative flex flex-col w-full h-full">
                {!session ? (
                  <div className="flex flex-col w-full h-full max-h-full text-[11px] items-center place-content-center">
                    <div className="flex gap-2 items-center">
                      <span>You need to</span>
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
                      <span>first to comment</span>
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
                    <hr className="border-stone-700" />
                    <RichTextEditor
                      userSession={session.user}
                      artikelId={artikelId}
                      content={commentContent}
                      charCount={characterCount}
                      wordCount={wordCount}
                      postButtonState={postButton}
                      limit={characterLimit}
                    />
                    <hr className="border-stone-700" />
                    <div className="flex w-ful justify-between items-center">
                      <div className="flex flex-col text-[0.6rem] text-stone-400">
                        <p>
                          <span className={`${charThresholdColor.value}`}>
                            {(
                              characterLimit - characterCount.value
                            ).toLocaleString("en-us")}
                          </span>{" "}
                          {`character${characterLimit - characterCount.value <= 1 ? "" : "s"} left`}
                        </p>
                        <p>
                          <span className="text-white">
                            {wordCount.value === 0
                              ? "Empty"
                              : wordCount.value.toLocaleString("en-us")}
                          </span>{" "}
                          {`word${wordCount.value <= 1 ? "" : "s"}`}
                        </p>
                      </div>
                      <div
                        className={`flex text-[0.7rem] p-2 rounded-md group ${postButton.value ? "bg-green-700 hover:bg-green-600 cursor-pointer" : "bg-stone-700 opacity-50 cursor-not-allowed"}`}
                        onClick={() =>
                          postButton.value ? postComment() : null
                        }
                      >
                        <span>Post Comment</span>
                      </div>
                    </div>
                  </div>
                )}
                <span
                  className="absolute top-0 right-0 text-red-700 cursor-pointer"
                  onClick={() => (commentNavOpen.value = false)}
                >
                  <IconSquareRoundedX />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ArtikelComment;
