import { auth } from "@/auth";
import React from "react";
import { redirect } from "next/navigation";
import Editorpage from "@/components/Editorpage";
import Link from "next/link";

const Post = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }
    return (
        <main className="flex h-full items-center justify-center flex-col gap-6">
            <div className="w-full flex justify-end px-6 mt-32">
                <Link href="/my-post">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
                        My Posts
                    </button>
                </Link>
            </div>

            <div className="w-full px-6">
                <Editorpage mode="create" />
            </div>
        </main>
    );
};

export default Post;
