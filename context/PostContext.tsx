"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getPost } from "@/app/action/post";

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
}

interface PostContextType {
  posts: Post[];
  refreshPosts: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const refreshPosts = async () => {
    const newPosts = await getPost();
    setPosts(newPosts);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, refreshPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
