"use client";

import { Session } from "next-auth";
import Link from "next/link";

type ArtikelCommentProps = {
  session: Session | null;
};

const ArtikelComment = ({ session }: ArtikelCommentProps) => {
  return (
    <div className='px-[5%] lg:px-[30%] pt-5'>
      {!session && (
        <Link
          href={{
            pathname: "/auth/signin",
            query: { originUrl: "/artikel/arrays-in-excel" },
          }}
        >
          Sign In First
        </Link>
      )}
      <h1 className='font-bold text-4xl'>This is comment section</h1>
    </div>
  );
};

export default ArtikelComment;
