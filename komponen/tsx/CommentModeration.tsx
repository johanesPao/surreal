"use client";

import { IconPencil, IconThumbUp } from "@tabler/icons-react";

const CommentModeration = () => {
  return (
    <div className="flex gap-2 justify-end">
      <div className="flex gap-1 items-center">
        <IconThumbUp />
        <span>Like</span>
      </div>
      <div className="flex gap-1 items-center">
        <IconPencil />
        <span>Edit</span>
      </div>
    </div>
  );
};

export default CommentModeration;
