"use client";

import { InferAccount, InferComment } from "@/schema";
import CommentViewer from "./CommentViewer";
import { effect, signal } from "@preact-signals/safe-react";
import { useEffect } from "react";
import { getAccountById } from "@/app/api/db/account";
import Image from "next/image";
import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";
import CommentModeration from "./CommentModeration";
import {
  opsiDateSimple,
  opsiStringDate,
} from "@/app/_interface-props/_format.props";

type CommentCardProps = {
  comment: InferComment;
};

const accountState = signal<InferAccount | null>(null);

const CommentCard = ({ comment }: CommentCardProps) => {
  const [diDesktop] = useDesktopOrMobile();

  const getAccountId = async (id: string) => {
    const account = await getAccountById(id);
    if (account) {
      accountState.value = account;
    }
  };

  useEffect(() => {
    getAccountId(comment.accountId);
  }, []);

  useEffect(() => {
    getAccountById(comment.accountId);
  }, [comment.accountId]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between w-full">
        <div className="flex gap-4 items-center">
          <Image
            src={accountState.value?.imageUrl as string}
            alt={accountState.value?.displayName as string}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-[1rem]">
              {accountState.value?.displayName}
            </span>
            <span className="text-[0.8rem]">
              {accountState.value?.provider}
            </span>
            {!diDesktop ? (
              <span className="text-[0.8rem]">
                {new Intl.DateTimeFormat("en-ID", opsiDateSimple).format(
                  new Date(comment.createdAt!),
                )}
              </span>
            ) : null}
          </div>
        </div>
        {diDesktop ? (
          <span className="text-[0.8rem]">
            {new Intl.DateTimeFormat("en-ID", opsiDateSimple).format(
              new Date(comment.createdAt!),
            )}
          </span>
        ) : null}
      </div>
      <CommentViewer content={JSON.stringify(comment.content)} />
      <hr className="border-stone-700" />
      <CommentModeration />
    </div>
  );
};

export default CommentCard;
