"use client";
import { CommentForm } from "./commentForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CommentCard } from "./commentCard";

interface Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  author: {
    id: string;
    name: string;
  };
}

export const CommentSection = ({
  comments: initialComments,
}: {
  comments: Comment[];
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const { data: session } = useSession();

  const updateComments = (newComments: Comment) => {
    setComments((prevComments) => [...prevComments, newComments] as Comment[]);
  };

  return (
    <>
      <div className="flex flex-col border shadow-md rounded-md gap-4 p-4 bg-card">
        <h2 className="text-xl text-center">Comments</h2>
        {comments.length === 0 && <p>No comments yet</p>}
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.id}
              isAdmin={session?.user.isAdmin || false}
              userId={session?.user.id || ""}
              comment={comment}
              setComments={setComments}
            />
          );
        })}
      </div>

      <div className="flex flex-col border shadow-md rounded-md gap-4 p-4 bg-card">
        <h2 className="text-xl">Add Comment</h2>
        {!session?.user ? (
          <p>Please login to comment</p>
        ) : (
          <CommentForm
            userId={session?.user.id || ""}
            updateComments={updateComments}
          />
        )}
      </div>
    </>
  );
};
