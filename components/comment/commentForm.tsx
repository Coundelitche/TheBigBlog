"use client";
import { createComment } from "@/app/action/comments";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface Comment {
  id: string;
  createdAt: Date;
  content: string;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
  };
}

export const CommentForm = ({
  userId,
  setComments,
}: {
  userId: string;
  setComments: (comments: Comment[] | ((prev: Comment[]) => Comment[])) => void;
}) => {
  const [content, setContent] = useState("");
  const params = useParams();
  const postId = params.id as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = await createComment({
      content,
      authorId: userId,
      postId: postId,
    });

    setComments((prev) => [...prev, newComment]);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full ">
        <Textarea
          name="content"
          placeholder="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="resize-none "
        />
        <Button
          type="submit"
          className="w-1/4 self-end disabled:opacity-50"
          disabled={!content.trim()}
        >
          Comment
        </Button>
      </form>
    </div>
  );
};
