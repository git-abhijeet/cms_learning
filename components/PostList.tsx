"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
}

const PostsList = ({
    posts,
    canDelete = false,
}: {
    posts: Post[];
    canDelete?: boolean;
}) => {
    const [postList, setPostList] = useState(posts);

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/post/${slug}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to delete post.");
            }

            setPostList((prev) => prev.filter((post) => post.slug !== slug));
            alert("Post deleted successfully!");
        } catch (error: any) {
            console.error("Error deleting post:", error);
            alert("Error deleting post: " + error.message);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            {postList.length === 0 ? (
                <p className="text-gray-600 text-lg text-center">
                    No posts found. Start creating your amazing content!
                </p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {postList.map((post) => (
                        <li
                            key={post.id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                                <h2 className="text-2xl font-bold text-white truncate">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-gray-200 mt-1">
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-700 mb-4">
                                    <span className="font-medium text-gray-900">
                                        Slug:
                                    </span>{" "}
                                    <span className="text-indigo-600">
                                        {post.slug}
                                    </span>
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <span className="font-medium text-gray-900">
                                        Author:
                                    </span>{" "}
                                    {post.user.name || "Unknown"}{" "}
                                    <a
                                        href={`mailto:${post.user.email}`}
                                        className="text-indigo-500 underline"
                                    >
                                        ({post.user.email})
                                    </a>
                                </p>

                                <div className="flex flex-col gap-4 mt-6">
                                    <Link href={`/post/${post.slug}`}>
                                        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-indigo-500 transition-all">
                                            View Details
                                        </button>
                                    </Link>
                                    {canDelete && (
                                        <div className="flex gap-4">
                                            <Link
                                                href={`/my-post/${post.slug}`}
                                            >
                                                <button className="flex-1 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-yellow-500 transition-all">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(post.slug)
                                                }
                                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default PostsList;
