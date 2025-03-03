import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { CreatePostForm } from "@/components/post/createPostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return <div>You are not an admin</div>;
  }

  return (
    <div className="flex flex-col items-center  h-screen">
      <CreatePostForm userId={session.user.id} />
    </div>
  );
}
