"use client";
import { Button } from "../ui/button";
import { CircleX, Pencil } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  getComments,
  deleteComment,
  updateComment,
} from "@/app/action/comments";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

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

export const CommentCard = ({
  isAdmin,
  userId,
  comment,
  setComments,
}: {
  isAdmin: boolean;
  userId: string;
  comment: Comment;
  setComments: (comments: Comment[] | ((prev: Comment[]) => Comment[])) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);
  const params = useParams();

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    toast.success("Comment deleted");
  };

  const handleEditTrigger = (comment: Comment) => {
    setCommentToEdit(comment);
    setIsEditing(true);
  };

  const handleEditComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content") as string;

    await updateComment({
      commentId: commentToEdit?.id as string,
      content,
    });
    const fetchComments = async () => {
      const fetchedComments = await getComments(params.id as string);
      setComments(fetchedComments);
    };
    fetchComments();

    setIsEditing(false);
    toast.success("Comment edited");
  };

  return (
    <div className="border border-black p-2 rounded-md bg-card">
      <div className="flex justify-between">
        <p className="pl-2">{comment.author.name}</p>
        <p className="text-sm">
          {new Date(comment.updatedAt).toLocaleDateString()}
        </p>
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-2 border p-1 rounded-md">
          <form
            onSubmit={handleEditComment}
            className="flex flex-col gap-1 p-1"
          >
            <Textarea
              name="content"
              placeholder="Comment"
              value={commentToEdit?.content}
              onChange={(e) =>
                setCommentToEdit({
                  id: commentToEdit?.id || "", // Assure que id est une string
                  content: e.target.value,
                  updatedAt: commentToEdit?.updatedAt || new Date(), // Définit une date par défaut
                  createdAt: commentToEdit?.createdAt || new Date(), // Définit une date par défaut
                  author: commentToEdit?.author || { id: "", name: "" }, // Définit un auteur par défaut
                })
              }
              className="resize-none "
            />
            <Button
              type="submit"
              className="w-1/4 self-end disabled:opacity-50"
              disabled={!commentToEdit?.content.trim()}
            >
              Update
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-2 border p-1 rounded-md bg-background">
          <p className="pl-2">{comment.content}</p>
        </div>
      )}
      {isAdmin || comment.author.id === userId ? (
        <div className="flex justify-end gap-1 mt-1">
          <Button onClick={() => handleDeleteComment(comment.id)}>
            <CircleX />
          </Button>
          <Button onClick={() => handleEditTrigger(comment)}>
            <Pencil />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
