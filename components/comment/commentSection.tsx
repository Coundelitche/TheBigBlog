"use client";
import { CommentForm } from "./commentForm";
import { getComments } from "@/app/action/comments";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useParams();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(params.id as string);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [params.id]);

  return (
    <>
      <div className="flex flex-col border shadow-md rounded-md gap-4 p-4 bg-card">
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
            setComments={setComments}
          />
        )}
      </div>
    </>
  );
};
