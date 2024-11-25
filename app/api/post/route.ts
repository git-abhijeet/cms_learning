import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, slug, content } = await request.json();

    if (!title || !slug || !content) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const existingPost = await db.post.findUnique({ where: { slug } });
        if (existingPost) {
            return NextResponse.json(
                { message: "Slug already exists" },
                { status: 409 }
            );
        }

        const newPost = await db.post.create({
            data: {
                title,
                slug,
                content,
                userEmail: session.user.email ?? "",
            },
        });

        return NextResponse.json(
            { message: "Post created successfully", post: newPost },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    try {
        const posts = await db.post.findMany({
            where: email ? { userEmail: email } : {},
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
