"use client";
import { PostPreviewCard } from "../post/postPreviewCard";
import { usePostContext } from "@/context/PostContext";
import { useCategoryContext } from "@/context/CategoryContext";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

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

export const PostDisplayer = () => {
  const { posts, refreshPosts } = usePostContext();
  const { categories } = useCategoryContext();
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<string>("date");

  useEffect(() => {
    refreshPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredPosts =
      categories === "All"
        ? [...posts] // Prend tous les posts si "All"
        : posts.filter((post) => post.category === categories);

    if (sortBy === "date") {
      filteredPosts.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } else if (sortBy === "likes") {
      filteredPosts.sort((a, b) => b.likes.length - a.likes.length);
    }

    setSortedPosts(filteredPosts);
  }, [posts, categories, sortBy]);

  return (
    <div className="flex flex-col items-center gap-4 py-4 mt-4">
      <div className="flex justify-between w-full px-4">
        <div className="w-1/3 flex">
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="bg-background text-sm md:text-lg">
              <SelectValue placeholder="Sort by:" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="likes">Likes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <h2 className="text-center text-xl md:text-2xl">
            {categories} Posts
          </h2>
        </div>
        <div className="w-1/3"></div>
      </div>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPosts.map((post) => (
          <PostPreviewCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
