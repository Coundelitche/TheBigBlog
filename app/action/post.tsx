"use server";
import { prisma } from "@/lib/prisma";

export async function createPost({
  title,
  content,
  imageUrl,
  authorId,
  description,
}: {
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
  description: string;
}) {
  const post = await prisma.post.create({
    data: {
      title,
      content,
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
  imageUrl,
  description,
}: {
  postId: string;
  title: string;
  content: string;
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
      imageUrl,
      description,
    },
  });

  return post;
}
