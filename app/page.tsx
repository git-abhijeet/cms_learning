import Image from "next/image";
import PostPage from "@/components/PostPage";

export default function Home() {
    return (
        <main className="flex h-full items-center justify-center">
            <PostPage />
        </main>
    );
}
