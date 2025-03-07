import { PostDisplayer } from "@/components/layout/postDisplayer";
import { Hero } from "@/components/layout/hero";
import { CategoryProvider } from "@/context/CategoryContext";

export default function Home() {
  return (
    <div>
      <CategoryProvider>
        <Hero />
        <PostDisplayer />
      </CategoryProvider>
    </div>
  );
}
