import { Button } from "./button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { likePost } from "@/app/action/post";
import { ThumbsUp } from "lucide-react";

interface Like {
  id: string;
  authorId: string;
  postId: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string;
  likes: Like[];
  author: {
    id: string;
    name: string | null;
  };
  createdAt: Date;
}

export const LikeButton = ({ post }: { post: Post }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async (postId: string) => {
    if (!session?.user.id) return;

    // Vérifier si l'utilisateur a déjà liké
    const hasLiked = likes.some((like) => like.authorId === session.user.id);

    if (!hasLiked) {
      const newLike = await likePost(postId, session.user.id);

      // Ajouter le nouveau like au tableau existant
      setLikes((prevLikes) => [...prevLikes, newLike]);
    }
  };

  return (
    <Button
      onClick={() => handleLike(post.id)}
      disabled={session ? false : true}
    >
      <ThumbsUp /> {likes.length}
    </Button>
  );
};
