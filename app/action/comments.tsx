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
    include: {
      author: true,
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
    orderBy: {
      createdAt: "asc",
    },
  });
  return comments;
}

export async function deleteComment(commentId: string) {
  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return comment;
}

export async function updateComment({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) {
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  return comment;
}
