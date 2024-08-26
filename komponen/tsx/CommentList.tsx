"use client";

import { getCommentByArticleID } from "@/app/api/db/comment";
import { InferComment } from "@/schema";
import { signal } from "@preact-signals/safe-react";
import { useEffect } from "react";
import CommentCard from "./CommentCard";

type CommentListProps = {
  comments: InferComment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="flex flex-col w-full items-center gap-4">
      {comments
        ? comments.map((comment) => {
            return <CommentCard key={comment.commentId} comment={comment} />;
          })
        : null}
    </div>
  );
};

export default CommentList;
