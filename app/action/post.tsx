"use server";
import { prisma } from "@/lib/prisma";

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

  return post;
}

export async function getPost() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function getPostById(id: string) {
  if (!id) {
    throw new Error("Post id is required");
  }
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
  return post;
}

export async function deletePost(postId: string) {
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return post;
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
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      category,
      imageUrl,
      description,
    },
  });

  return post;
}
