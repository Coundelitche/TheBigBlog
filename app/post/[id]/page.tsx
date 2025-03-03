import { getPostById } from "@/app/action/post";
import { getComments } from "@/app/action/comments";
import { getServerSession } from "next-auth";
import { CommentForm } from "@/components/comment/commentForm";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) {
    return <div>Post not found</div>;
  }
  const comments = await getComments(id);

  return (
    <div className="px-4 flex flex-col gap-4">
      <div className="flex flex-col border shadow-md rounded-md">
        <Image
          src={post.imageUrl}
          alt="post image"
          width={200}
          height={200}
          className="w-full h-72 object-cover rounded-t-md"
        />
        <div className="w-full flex flex-col justify-between p-4">
          <h2 className="text-xl underline">{post.title}</h2>
          <p>{post.content}</p>
          <div className="flex justify-end text-xl">{post.author.name}</div>
        </div>
      </div>
      <div className="flex flex-col border shadow-md rounded-md gap-4 p-4">
        <h2>Comments</h2>

        {comments.map((comment) => {
          return (
            <div
              className="flex flex-col gap-2 border p-1 rounded-md"
              key={comment.id}
            >
              <h3>
                {comment.author.name}
                {comment.createdAt.toDateString()}
              </h3>
              <p className="pl-2">{comment.content}</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col border shadow-md rounded-md gap-4 p-4">
        <h2>Add Comment</h2>
        {!session ? (
          <p>Please login to comment</p>
        ) : (
          <CommentForm userId={session.user.id} />
        )}
      </div>
    </div>
  );
}
