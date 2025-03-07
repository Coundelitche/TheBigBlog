import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string;
  author: {
    id: string;
    name: string | null;
  };
}

export const PostPreviewCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      className="hover:bg-gray-200 hover:scale-95 hover:rounded-md transition-all"
    >
      <div className="flex border rounded-lg shadow-md bg-card">
        <Image
          src={post.imageUrl}
          alt="post image"
          width={2000}
          height={2000}
          className="w-1/2 h-72 rounded-l-lg object-cover"
        />
        <div className="w-1/2 flex flex-col justify-between p-4">
          <div>
            <h2 className="text-xl underline text-center">{post.title}</h2>
          </div>
          <div>{post.description}</div>
          <div className="flex justify-between text-xl">
            <Badge>{post.category}</Badge>
            <p>{post.author.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
