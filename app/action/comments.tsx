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
  try {
    if (!postId || !content || !authorId) {
      throw new Error("Tous les champs sont requis.");
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
      include: {
        author: {
          select: { id: true, name: true }, // Sécuriser les infos retournées
        },
      },
    });

    return comment;
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    throw new Error("Impossible d'ajouter le commentaire.");
  }
}

export async function getComments(postId: string) {
  try {
    if (!postId) {
      throw new Error("L'ID du post est requis.");
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: { id: true, name: true }, // Ne retourne que le nécessaire
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return comments;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    throw new Error("Impossible de récupérer les commentaires.");
  }
}

export async function deleteComment(commentId: string) {
  try {
    if (!commentId) {
      throw new Error("L'ID du commentaire est requis.");
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      throw new Error("Commentaire introuvable.");
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return { success: true, message: "Commentaire supprimé." };
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    throw new Error("Impossible de supprimer le commentaire.");
  }
}

export async function updateComment({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) {
  try {
    if (!commentId || !content) {
      throw new Error("Tous les champs sont requis.");
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      throw new Error("Commentaire introuvable.");
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    return updatedComment;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire:", error);
    throw new Error("Impossible de modifier le commentaire.");
  }
}
