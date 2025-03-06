"use client";
import { CreatePostForm } from "@/components/post/createPostForm";
import { useSession } from "next-auth/react";

export default function CreatePost() {
  const { data: session } = useSession();

  if (!session) {
    return <div>You are not signed in</div>;
  }

  if (!session.user?.isAdmin) {
    return <div>You are not an admin</div>;
  }

  return (
    <div className="flex flex-col items-center  h-screen">
      <CreatePostForm userId={session.user.id} />
    </div>
  );
}
