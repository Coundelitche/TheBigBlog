import { getPost } from "@/app/action/post";
import { PostPreviewCard } from "../post/postPreviewCard";

export const PostDisplayer = async () => {
  const posts = await getPost();
  return (
    <div className="px-4 flex flex-col gap-4">
      {posts.map((post) => {
        return <PostPreviewCard key={post.id} post={post} />;
      })}
    </div>
  );
};
