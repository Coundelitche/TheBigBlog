"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function createPost({
  title,
  content,
  imageUrl,
  authorId,
  category,
  description,
}: {
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
  category: string;
  description: string;
}) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        imageUrl,
        authorId,
        description,
      },
    });

    revalidateTag("posts"); // Rafraîchir le cache après création
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post.");
  }
}

export async function getPost() {
  try {
    return await prisma.post.findMany({
      include: {
        author: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function getPostById(id: string) {
  if (!id) throw new Error("Post id is required");

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true, likes: true },
    });

    if (!post) throw new Error("Post not found");

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post.");
  }
}

export async function deletePost(postId: string) {
  if (!postId) throw new Error("Post id is required");

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) throw new Error("Post not found");

    await prisma.post.delete({ where: { id: postId } });

    revalidateTag("posts"); // Rafraîchir le cache après suppression
    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post.");
  }
}

export async function updatePost({
  postId,
  title,
  content,
  category,
  imageUrl,
  description,
}: {
  postId: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  description: string;
}) {
  if (!postId) throw new Error("Post id is required");

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) throw new Error("Post not found");

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content, category, imageUrl, description },
    });

    revalidateTag("posts"); // Rafraîchir le cache après modification
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post.");
  }
}

export async function likePost(postId: string, userId: string) {
  if (!postId || !userId) throw new Error("Post ID and User ID are required");

  try {
    const existingLike = await prisma.like.findFirst({
      where: { postId, authorId: userId },
    });

    if (existingLike) throw new Error("User already liked this post");

    const like = await prisma.like.create({
      data: { postId, authorId: userId },
    });

    revalidateTag("posts"); // Rafraîchir le cache après un like
    return like;
  } catch (error) {
    console.error("Error liking post:", error);
    throw new Error("Failed to like post.");
  }
}
