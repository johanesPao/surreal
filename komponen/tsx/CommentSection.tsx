"use client";

import { InferComment } from "@/schema";
import CommentList from "./CommentList";
import NoComments from "./NoComments";

type CommentSectionProps = {
  comments: InferComment[];
};

const CommentSection = ({ comments }: CommentSectionProps) => {
  return (
    <div className="flex flex-col pt-[2rem] px-[5%] lg:px-[20%] gap-8">
      <div className="text-[1.2rem] font-bold">Speak Your Mind (or Don't)</div>
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <NoComments />
      )}
    </div>
  );
};

export default CommentSection;
