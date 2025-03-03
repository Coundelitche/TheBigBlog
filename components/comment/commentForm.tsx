"use client";
import { createComment } from "@/app/action/comments";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const CommentForm = ({ userId }: { userId: string }) => {
  const [content, setContent] = useState("");
  const authorId = userId;
  const params = useParams();
  const id = params.id as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content, authorId, id);

    await createComment({
      content,
      authorId: authorId,
      postId: id,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full ">
        <Textarea
          name="content"
          placeholder="Comment"
          onChange={(e) => setContent(e.target.value)}
          className="resize-none "
        />
        <Button type="submit" className="w-1/4 self-end">
          Comment
        </Button>
      </form>
    </div>
  );
};
