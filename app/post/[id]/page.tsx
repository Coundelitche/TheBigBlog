import { getPostById } from "@/app/action/post";
import { getServerSession } from "next-auth";
import { CommentSection } from "@/components/comment/commentSection";
import { PostCard } from "@/components/post/postCard";

export default async function PostPage({
  params,
}: {
  params: { id?: string | string[] };
}) {
  if (!params.id) return <div>Post not found</div>; // Vérification

  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Gérer le cas où c'est un tableau
  if (!id) return <div>Invalid Post ID</div>; // Vérification supplémentaire

  const session = await getServerSession();
  const post = await getPostById(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="px-4 flex flex-col gap-4 my-4">
      <PostCard post={post} session={session} />
      <CommentSection
        userId={session ? session.user.id : ""}
        isAdmin={session?.user.isAdmin || false}
      />
    </div>
  );
}
