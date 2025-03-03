"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
