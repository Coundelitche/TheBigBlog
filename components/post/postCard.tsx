"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { deletePost } from "@/app/action/post";
import { Session } from "next-auth";
import { useState } from "react";
import { updatePost } from "@/app/action/post";
import { CircleX, Pencil } from "lucide-react";
import DOMPurify from "dompurify";

interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  };
}

export const PostCard = ({
  post,
  session,
}: {
  post: Post;
  session: Session | null;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualPost, setActualPost] = useState(post);

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const description = formData.get("description") as string;

    await updatePost({
      postId: actualPost.id,
      title,
      content,
      imageUrl,
      description,
    });
    setActualPost({
      id: actualPost.id,
      title,
      content,
      description,
      imageUrl,
      createdAt: actualPost.createdAt,
      author: actualPost.author,
    });
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className="flex flex-col border shadow-md rounded-md bg-card p-2">
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={actualPost.title}
                onChange={(e) =>
                  setActualPost({ ...actualPost, title: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                name="description"
                placeholder="description"
                value={actualPost.description}
                onChange={(e) =>
                  setActualPost({ ...actualPost, description: e.target.value })
                }
                required
              ></Textarea>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="content">Content</Label>
              <Textarea
                name="content"
                placeholder="Content"
                className="h-36"
                value={actualPost.content}
                onChange={(e) =>
                  setActualPost({ ...actualPost, content: e.target.value })
                }
                required
              ></Textarea>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={actualPost.imageUrl}
                onChange={(e) =>
                  setActualPost({ ...actualPost, imageUrl: e.target.value })
                }
              />
            </div>
            <Button type="submit">Confirm</Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col border shadow-md rounded-md bg-card">
          <Image
            src={actualPost.imageUrl}
            alt="actualPost image"
            width={2000}
            height={2000}
            className="w-full h-72 object-cover rounded-t-md"
          />
          <div className="w-full flex flex-col justify-between p-4">
            <h2 className="text-xl underline">{actualPost.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
            <div className="flex justify-end text-xl">
              <div className="flex flex-col">
                <p className="text-right">{actualPost.author.name}</p>
                <p className="text-sm text-right">
                  {new Date(actualPost.createdAt).toLocaleDateString()}
                </p>
                {session?.user.isAdmin &&
                actualPost.author.id === session?.user.id ? (
                  <div className="flex gap-1 mt-1">
                    <Link href={"/"}>
                      <Button onClick={() => handleDelete(actualPost.id)}>
                        <CircleX />
                      </Button>
                    </Link>
                    <Button onClick={() => setIsEditing(true)}>
                      <Pencil />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
