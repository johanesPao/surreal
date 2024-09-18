'use client';

import { InferComment } from '@/schema';
import { IconPencil, IconThumbUp } from '@tabler/icons-react';
import { Session } from 'next-auth';
import { useEffect } from 'react';

type CommentModerationProps = {
  session: Session | null;
  accountId: InferComment['accountId'];
};

const CommentModeration = ({ session, accountId }: CommentModerationProps) => {
  let commentOwner: boolean;

  if (session) {
    commentOwner = session.user.id === accountId;
  } else {
    commentOwner = false;
  }

  return (
    <div className="flex gap-2 justify-end">
      <div className="flex gap-1 items-center">
        <IconThumbUp />
        <span>Like</span>
      </div>
      {commentOwner && (
        <div className="flex gap-1 items-center">
          <IconPencil />
          <span>Edit</span>
        </div>
      )}
    </div>
  );
};

export default CommentModeration;
