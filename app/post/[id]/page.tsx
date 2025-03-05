import { getPostById } from "@/app/action/post";
import { getServerSession } from "next-auth";
import { CommentSection } from "@/components/comment/commentSection";
import { PostCard } from "@/components/post/postCard";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PostPage({ params, searchParams }: PageProps) {
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
