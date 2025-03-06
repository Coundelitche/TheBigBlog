"use client";
import { PostDisplayer } from "@/components/layout/postDisplayer";
import { Hero } from "@/components/layout/hero";
import { getPost } from "@/app/action/post";
import { usePostContext } from "@/context/PostContext";

export default function Home() {
  const { posts } = usePostContext();
  return (
    <div>
      <Hero />
      <PostDisplayer posts={posts} />
    </div>
  );
}
