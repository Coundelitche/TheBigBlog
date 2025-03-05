import { getPostById } from "@/app/action/post";
import { getServerSession } from "next-auth";
import { CommentSection } from "@/components/comment/commentSection";
import { PostCard } from "@/components/post/postCard";

export default async function PostPage(
  props: Promise<{
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }>
) {
  // On attend la résolution des props (params et searchParams)
  const { params, searchParams: _searchParams } = await props;
  const session = await getServerSession();
  const { id } = params;
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
