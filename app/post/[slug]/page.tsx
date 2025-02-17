import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { auth } from "@/auth";
import React from "react";
import PostDetails from "@/components/PostDetails";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    createdAt: string; // Keeping it as string for rendering
    updatedAt: string;
    user: {
        name?: string | null;
        email?: string | null;
    };
}

const PostDetailsPage = async ({ params }: { params: { slug: string } }) => {
    const session = await auth();

    if (!session?.user) {
        redirect("/sign-in");
    }

    const { slug } = params;

    const post = await db.post.findUnique({
        where: { slug },
        include: { user: true },
    });

    if (!post) {
        notFound();
    }

    const formattedPost: Post = {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    };

    return (
        <main className="p-8">
            <PostDetails
                title={formattedPost.title}
                authorName={formattedPost.user.name}
                authorEmail={formattedPost.user.email}
                createdAt={formattedPost.createdAt}
                content={formattedPost.content}
            />
        </main>
    );
};

export default PostDetailsPage;
