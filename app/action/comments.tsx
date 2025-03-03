"use server";
import { prisma } from "@/lib/prisma";

export async function createComment({
  postId,
  content,
  authorId,
}: {
  postId: string;
  content: string;
  authorId: string;
}) {
  if (!postId || !content || !authorId) {
    throw new Error("Missing required fields");
  }
  const comment = await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
  });

  return comment;
}

export async function getComments(postId: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
  });
  return comments;
}
