import { getPost } from "@/app/action/post";
import { PostPreviewCard } from "../post/postPreviewCard";

export const PostDisplayer = async () => {
  const posts = await getPost();
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h2 className="text-center text-2xl">Latest Posts</h2>
      <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {posts.map((post) => {
          return <PostPreviewCard key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};
