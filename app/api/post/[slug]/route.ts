import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const slug = params.slug;
        console.log("🚀 ~ slug:", slug);

        const post = await db.post.findUnique({ where: { slug } });

        if (!post) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        const deletedPost = await db.post.delete({ where: { slug } });
        console.log("🚀 ~ deletedPost:", deletedPost);

        return NextResponse.json(
            { message: "Post deleted successfully", deletedPost },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { message: "Error deleting post" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const slug = params.slug;
        console.log("🚀 ~ PUT ~ slug:", slug);

        const post = await db.post.findUnique({ where: { slug } });

        if (!post) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        const { title, newSlug, content } = await request.json();

        if (!title || !newSlug || !content) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        if (newSlug !== slug) {
            const existingPost = await db.post.findUnique({
                where: { slug: newSlug },
            });
            if (existingPost) {
                return NextResponse.json(
                    { message: "New slug already exists" },
                    { status: 409 }
                );
            }
        }

        const updatedPost = await db.post.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                content,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(
            { message: "Post updated successfully", post: updatedPost },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json(
            { message: "Error updating post" },
            { status: 500 }
        );
    }
}
