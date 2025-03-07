"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Logo from "../../public/logobigblog.webp";
import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between my-3 mx-4">
      <div className="w-1/3"></div>
      <div className="flex justify-center w-1/3">
        <Link href="/">
          <Image src={Logo} alt="logo" width={120} height={120} />
        </Link>
      </div>
      <div className="flex justify-end items-center w-1/3">
        {!session?.user ? (
          <div className="flex flex-col gap-3">
            <Link href="/auth/register" className="w-full">
              <Button className="w-full">Register</Button>
            </Link>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full">
                <LogIn />{" "}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {session?.user.isAdmin && (
              <Link href="/post/create">
                {" "}
                <Button>Create Post</Button>
              </Link>
            )}
            <Button onClick={() => signOut()}>
              <LogOut />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
