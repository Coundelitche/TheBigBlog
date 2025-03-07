"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import bg2 from "@/public/hero2.webp";
import { Button } from "../ui/button";
import { useCategoryContext } from "@/context/CategoryContext";

export const Hero = () => {
  const { setCategories } = useCategoryContext();
  const pathname = usePathname(); // Récupérer l'URL actuelle

  // Vérifier si on est sur les pages register ou login
  const isAuthPage =
    pathname === "/auth/register" || pathname === "/auth/login";

  return (
    <div className="flex flex-col items-center justify-center mx-4 my-3 relative">
      <div className="flex flex-col gap-4 items-center justify-center border rounded-md bg-card shadow-md relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-10 rounded-md"></div>
        <Image
          src={bg2}
          alt="hero image"
          width={2000}
          height={2000}
          className="object-cover rounded-md h-92 relative"
          priority
        />
        <div className="w-2/3 absolute z-20 text-white">
          <h1 className="text-5xl font-bold mb-6 text-center">Welcome</h1>
          <p className="text-center text-xl">
            Follow our journey as we build Wakehub and other exciting projects.
            We&apos;ll be sharing updates, insights, and lessons learned along
            the way. Stay tuned!
            <br />
            Feel free to leave a comment and share your thoughts!
          </p>
        </div>
      </div>

      {/* Masquer cette div si on est sur une page d'authentification */}
      {!isAuthPage && (
        <div className="flex justify-center absolute -bottom-6 border rounded-md shadow-md p-2 bg-background z-30 gap-2">
          <Button onClick={() => setCategories("Javascript")}>
            Javascript
          </Button>
          <Button onClick={() => setCategories("Python")}>Python</Button>
          <Button onClick={() => setCategories("Lifestyle")}>Lifestyle</Button>
          <Button onClick={() => setCategories("All")}>All</Button>
        </div>
      )}
    </div>
  );
};
