"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between p-2">
      <h1>The BigBlog</h1>
      {!session?.user ? (
        <div className="flex gap-1">
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-1">
          {session?.user.isAdmin && (
            <Link href="/post/create">
              {" "}
              <Button>Create Post</Button>
            </Link>
          )}
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      )}
    </div>
  );
};
