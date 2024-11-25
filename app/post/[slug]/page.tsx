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
    createdAt: string;
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

    const post: Post | null = await db.post.findUnique({
        where: { slug },
        include: { user: true },
    });

    if (!post) {
        notFound();
    }

    return (
        <main className="p-8">
            <PostDetails
                title={post.title}
                authorName={post.user.name}
                authorEmail={post.user.email}
                createdAt={post.createdAt}
                content={post.content}
            />
        </main>
    );
};

export default PostDetailsPage;
