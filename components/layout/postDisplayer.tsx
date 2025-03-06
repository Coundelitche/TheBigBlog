"use client";
import { PostPreviewCard } from "../post/postPreviewCard";
import { usePostContext } from "@/context/PostContext";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  author: {
    id: string;
    name: string | null;
  };
}

export const PostDisplayer = () => {
  const { posts } = usePostContext();
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h2 className="text-center text-2xl">Latest Posts</h2>
      <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {posts.map((post: Post) => {
          return <PostPreviewCard key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};
