// File: app/post/edit/[slug]/page.tsx
import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";
import EditorPage from "@/components/Editorpage";

const EditPost = async ({ params }: { params: { slug: string } }) => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const post = await db.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post) {
        redirect("/my-post");
    }

    if (post.userEmail !== session.user.email) {
        redirect("/my-post");
    }

    const initialData = {
        title: post.title,
        slug: post.slug,
        content: post.content,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            <EditorPage
                mode="edit"
                initialData={initialData}
                postSlug={params.slug}
            />
        </div>
    );
};

export default EditPost;
