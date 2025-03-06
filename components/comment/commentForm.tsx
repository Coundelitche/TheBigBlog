"use client";
import { createComment } from "@/app/action/comments";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import z from "zod";

const commentSchema = z.object({
  content: z.string().min(1),
  authorId: z.string().min(1),
  postId: z.string().min(1),
});

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

interface CommentFormProps {
  userId: string;
  updateComments: (newComment: Comment) => void;
}

export const CommentForm = ({ userId, updateComments }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const params = useParams();
  const postId = params.id as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      content,
      authorId: userId,
      postId: postId,
    };
    const result = commentSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    const newComment = await createComment(result.data);

    updateComments(newComment);
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
