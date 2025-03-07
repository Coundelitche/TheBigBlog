"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Logo from "../../public/logobigblog.webp";
import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

export const Header = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out");
  };

  return (
    <div className="flex items-center justify-between my-3 mx-4">
      <div className="hidden md:block md:w-1/3"></div>
      <div className="flex justify-start md:justify-center w-1/2 md:w-1/3">
        <Link href="/">
          <Image src={Logo} alt="logo" width={120} height={120} />
        </Link>
      </div>
      <div className="flex justify-start md:justify-end items-center  md:w-1/3">
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
            <Button onClick={handleLogout}>
              <LogOut />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
