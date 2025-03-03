import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { PostDisplayer } from "@/components/layout/postDisplayer";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <PostDisplayer />
    </div>
  );
}
