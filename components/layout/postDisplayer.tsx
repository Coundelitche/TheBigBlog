"use client";
import { PostPreviewCard } from "../post/postPreviewCard";
import { usePostContext } from "@/context/PostContext";
import { useCategoryContext } from "@/context/CategoryContext";
import { useEffect } from "react";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string;
  author: {
    id: string;
    name: string | null;
  };
}

export const PostDisplayer = () => {
  const { posts, refreshPosts } = usePostContext();
  const { categories } = useCategoryContext();

  useEffect(() => {
    refreshPosts();
  }, []);

  const displayedPosts = posts.filter((post) => post.category === categories);
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h2 className="text-center text-2xl">{categories} Posts</h2>
      <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {categories === "All"
          ? posts.map((post: Post) => {
              return <PostPreviewCard key={post.id} post={post} />;
            })
          : displayedPosts.map((post: Post) => {
              return <PostPreviewCard key={post.id} post={post} />;
            })}
      </div>
    </div>
  );
};
