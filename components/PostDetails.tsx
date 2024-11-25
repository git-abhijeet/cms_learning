import React from "react";

interface PostDetailsProps {
    title: string;
    authorName?: string | null;
    authorEmail?: string | null;
    createdAt: string;
    content: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({
    title,
    authorName,
    authorEmail,
    createdAt,
    content,
}) => {
    return (
        <article className="prose lg:prose-xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <header className="mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    {title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-700">
                        <span className="font-medium text-gray-800">
                            Author:
                        </span>{" "}
                        {authorName || "Unknown"}{" "}
                        <span className="italic text-sm text-gray-500">
                            ({authorEmail})
                        </span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2 sm:mt-0">
                        <span className="font-medium">Published:</span>{" "}
                        {new Date(createdAt).toLocaleString()}
                    </p>
                </div>
            </header>
            <div
                className="mt-6 leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </article>
    );
};

export default PostDetails;
