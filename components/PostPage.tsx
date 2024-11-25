import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostList from "@/components/PostList";

const PostPage = async ({ userEmail }: { userEmail?: string }) => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const canDelete = !!userEmail && userEmail === session.user.email;

    const whereClause = userEmail ? { user: { email: userEmail } } : {};

    const posts = await db.post.findMany({
        where: whereClause,
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

    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-10">
            <PostList posts={posts} canDelete={canDelete} />
        </main>
    );
};

export default PostPage;
