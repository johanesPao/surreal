"use client";

import { Session } from "next-auth";
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";

type ArtikelCommentProps = {
  session: Session | null;
  artikelId: string;
};

const ArtikelComment = ({ session, artikelId }: ArtikelCommentProps) => {
  return (
    <div className='px-[5%] lg:px-[30%] pt-5 w-full flex flex-col gap-3'>
      {!session ? (
        <Link
          href={{
            pathname: "/auth/signin",
            query: { originUrl: "/artikel/arrays-in-excel" },
          }}
          className="shadow-2xl"
        >
          Sign in to leave a comment
        </Link>
      ) : (
        <div className="w-full bg-stone-900 p-4 shadow-xl shadow-pitch-black/10 rounded-md">
          <RichTextEditor userSession={session.user} artikelId={artikelId}/>
        </div>
      )}
      <span>Comment List</span>
    </div>
  );
};

export default ArtikelComment;
