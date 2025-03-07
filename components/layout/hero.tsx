"use client";
import Image from "next/image";
import bg2 from "@/public/hero2.jpg";
import { Button } from "../ui/button";
import { useCategoryContext } from "@/context/CategoryContext";

export const Hero = () => {
  const { setCategories } = useCategoryContext();

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
      <div className="flex justify-center absolute -bottom-6 border rounded-md shadow-md p-2 bg-background z-30 gap-2">
        <Button onClick={() => setCategories("Javascript")}>Javascript</Button>
        <Button onClick={() => setCategories("Python")}>Python</Button>
        <Button onClick={() => setCategories("Lifestyle")}>Lifestyle</Button>
        <Button onClick={() => setCategories("All")}>All</Button>
      </div>
    </div>
  );
};
