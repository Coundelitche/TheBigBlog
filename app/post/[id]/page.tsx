import { getPostById } from "@/app/action/post";
import { CommentSection } from "@/components/comment/commentSection";
import { PostCard } from "@/components/post/postCard";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="px-4 flex flex-col gap-4 my-4">
      <PostCard post={post} />
      <CommentSection />
    </div>
  );
}
