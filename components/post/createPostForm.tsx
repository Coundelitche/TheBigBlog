"use client";
import { createPost } from "@/app/action/post";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

export const CreatePostForm = ({ userId }: { userId: string }) => {
  const authorId = userId;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const description = formData.get("description") as string;

    await createPost({
      title,
      content,
      imageUrl,
      authorId,
      description,
    });
    router.push("/");
  };
  return (
    <div className="flex flex-col gap-3 w-2/3">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input type="text" name="title" placeholder="Title" required />
        </div>
        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            name="description"
            placeholder="description"
            required
          ></Textarea>
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea name="content" placeholder="Content" required></Textarea>
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input type="text" name="imageUrl" placeholder="Image URL" />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};
