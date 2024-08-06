"use client";

import { Session } from "next-auth";
import Link from "next/link";

type ArtikelCommentProps = {
  session: Session | null;
};

const ArtikelComment = ({ session }: ArtikelCommentProps) => {
  return (
    <div className='px-[5%] lg:px-[30%] pt-5 w-full flex flex-row font-monaspaceKrypton place-content-center'>
      {!session && (
        <Link
          href={{
            pathname: "/auth/signin",
            query: { originUrl: "/artikel/arrays-in-excel" },
          }}
          className="shadow-2xl"
        >
          Sign in to leave a comment
        </Link>
      )}
    </div>
  );
};

export default ArtikelComment;
