"use client";
import { createPost } from "@/app/action/post";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Editor } from "@tiptap/react";
import { usePostContext } from "@/context/PostContext";
import z from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  authorId: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().min(1),
});

const TiptapArea = dynamic(() => import("../ui/tiptap"), {
  ssr: false,
});

export const CreatePostForm = ({ userId }: { userId: string }) => {
  const authorId = userId;
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);
  const { refreshPosts } = usePostContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = editorRef.current?.getHTML() || "";

    const data = {
      title: formData.get("title") as string,
      content: content, // On envoie le contenu ici
      imageUrl: formData.get("imageUrl") as string,
      authorId,
      description: formData.get("description") as string,
    };
    const result = postSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    await createPost(result.data);
    refreshPosts();
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full px-4 mt-8 itemes-center">
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-3xl text-center">Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" placeholder="Title" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Short Description</Label>
            <Textarea name="description" placeholder="description" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="content">Content</Label>
            <TiptapArea editorRef={editorRef} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input type="text" name="imageUrl" placeholder="Image URL" />
          </div>
          <Button type="submit" className="w-full lg:w-1/3 self-center">
            Create
          </Button>
        </form>
      </div>
      <div className="w-full flex justify-center">
        <Link href="/" className="mt-2 w-full flex justify-center">
          <Button className="w-full lg:w-1/3">Back</Button>
        </Link>
      </div>
    </div>
  );
};
