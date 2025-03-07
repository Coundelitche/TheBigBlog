"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const normalizedEmail = email.toLowerCase();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new Error("Cet email est déjà utilisé.");
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true, // Retourner seulement des infos publiques
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Impossible de créer l'utilisateur.");
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }, // Normalisation de l'email
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // À garder uniquement si tu veux l'utiliser pour l'authentification
      },
    });

    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Impossible de récupérer l'utilisateur.");
  }
}
