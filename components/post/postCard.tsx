"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { deletePost, updatePost } from "@/app/action/post";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CircleX, Pencil } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { Badge } from "../ui/badge";
import { LikeButton } from "../ui/likeButton";

interface Like {
  id: string;
  authorId: string;
  postId: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string;
  likes: Like[];
  author: {
    id: string;
    name: string | null;
  };
  createdAt: Date;
}

export const PostCard = ({ post }: { post: Post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualPost, setActualPost] = useState(post);
  const { data: session } = useSession();

  const sanitizeAndWrapCode = (content: string) => {
    const wrappedContent = content.replace(
      /<code>([\s\S]*?)<\/code>/g,
      "<pre><code>$1</code></pre>"
    );

    return DOMPurify.sanitize(wrappedContent);
  };

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const description = formData.get("description") as string;

    await updatePost({
      postId: actualPost.id,
      title,
      content,
      category,
      imageUrl,
      description,
    });
    setActualPost({
      id: actualPost.id,
      title,
      content,
      category,
      description,
      imageUrl,
      likes: actualPost.likes,
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
                className="h-96"
                value={actualPost.content}
                onChange={(e) =>
                  setActualPost({ ...actualPost, content: e.target.value })
                }
                required
              ></Textarea>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="Javascript" name="category">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
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
            priority
          />
          <div className="w-full flex flex-col justify-between py-4 px-10">
            <h2 className="text-3xl text-center underline mb-10 mt-6">
              {actualPost.title}
            </h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(sanitizeAndWrapCode(post.content)),
              }}
            />
            <div className="flex justify-between text-xl border-t-3 mt-3 pt-3">
              <div className="flex items-center">
                <Badge className="p-2 text-md">{actualPost.category}</Badge>
              </div>
              <div className="flex flex-col">
                <p className="text-right">{actualPost.author.name}</p>
                <p className="text-sm text-right">
                  {new Date(actualPost.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-1 mt-1">
                  {" "}
                  {session?.user.isAdmin &&
                  actualPost.author.id === session?.user.id ? (
                    <>
                      <Link href={"/"}>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(actualPost.id)}
                        >
                          <CircleX />
                        </Button>
                      </Link>
                      <Button onClick={() => setIsEditing(true)}>
                        <Pencil />
                      </Button>
                    </>
                  ) : null}
                  <LikeButton post={actualPost} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
