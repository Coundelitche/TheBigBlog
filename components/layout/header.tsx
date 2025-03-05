"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Logo from "../../public/logobigblog.jpg";
import Image from "next/image";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between p-2">
      <Link href="/">
        <Image src={Logo} alt="logo" width={100} height={100} />
      </Link>

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
