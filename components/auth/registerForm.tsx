"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createUser, getUserByEmail } from "@/app/action/user";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    if (await getUserByEmail(email)) {
      alert("Email already exists");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    await createUser({
      name,
      email,
      password,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label>Name</Label>
          <Input type="text" name="name" placeholder="Name" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            required
          />
        </div>

        <Button type="submit">Register</Button>
      </form>
      <Button onClick={() => router.push("/")} className="w-full mt-2">
        Back
      </Button>
    </div>
  );
};
