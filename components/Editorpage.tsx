"use client";

import React, { useRef, useState, useEffect } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import type { Editor as EditorType } from "tinymce";
import { useRouter } from "next/navigation";
import PreviewModal from "@/components/PreviewModal";
import { useSession } from "next-auth/react";

interface EditorPageProps {
    mode?: "create" | "edit";
    initialData?: {
        title: string;
        slug: string;
        content: string;
    };
    postSlug?: string;
}

const EditorPage: React.FC<EditorPageProps> = ({
    mode = "create",
    initialData,
    postSlug,
}) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const editorRef = useRef<EditorType | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handlePreview = () => {
        if (!title || !editorRef.current) {
            alert("Please fill in the title and content before previewing");
            return;
        }
        setIsPreviewOpen(true);
    };

    const handleSubmit = async () => {
        if (!title || !slug || !editorRef.current) {
            alert("Please fill all fields");
            return;
        }

        const content = editorRef.current.getContent();
        const data =
            mode === "create"
                ? { title, slug, content }
                : { title, newSlug: slug, content };

        try {
            const response = await fetch(
                mode === "create" ? "/api/post" : `/api/post/${postSlug}`,
                {
                    method: mode === "create" ? "POST" : "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                alert(
                    mode === "create"
                        ? "Post created successfully!"
                        : "Post updated successfully!"
                );
                if (mode === "create") {
                    // Reset form for create mode
                    setTitle("");
                    setSlug("");
                    editorRef.current.setContent("");
                } else {
                    // Redirect to my-posts page after edit
                    router.push("/my-post");
                }
            } else {
                alert(`Error: ${responseData.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An unexpected error occurred");
        }
    };

    return (
        <main className="p-4">
            <div className="p-6 bg-white rounded-md shadow-md">
                <form className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="Enter slug"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </form>
            </div>

            <TinyMCEEditor
                apiKey="ie1mb9s0pzkpx514txose8gjlqpjsaecui5jscms4kdacvp7"
                onInit={(_evt, editor) => {
                    editorRef.current = editor;
                    console.log("TinyMCE editor initialized");
                    console.log(editor.plugins);
                }}
                initialValue={initialData?.content || ""}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "anchor",
                        "autolink",
                        "charmap",
                        "codesample",
                        "emoticons",
                        "image",
                        "link",
                        "lists",
                        "media",
                        "searchreplace",
                        "table",
                        "visualblocks",
                        "wordcount",
                        "checklist",
                        "mediaembed",
                        "casechange",
                        "export",
                        "formatpainter",
                        "pageembed",
                        "a11ychecker",
                        "tinymcespellchecker",
                        "permanentpen",
                        "powerpaste",
                        "advtable",
                        "advcode",
                        "editimage",
                        "advtemplate",
                        "mentions",
                        "tinycomments",
                        "tableofcontents",
                        "footnotes",
                        "mergetags",
                        "autocorrect",
                        "typography",
                        "inlinecss",
                        "markdown",
                        "importword",
                        "exportword",
                        "exportpdf",
                    ],
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                    ],
                    exportpdf_converter_options: {
                        format: "Letter",
                        margin_top: "1in",
                        margin_right: "1in",
                        margin_bottom: "1in",
                        margin_left: "1in",
                    },
                    exportword_converter_options: {
                        document: { size: "Letter" },
                    },
                    importword_converter_options: {
                        formatting: {
                            styles: "inline",
                            resets: "inline",
                            defaults: "inline",
                        },
                    },
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />

            <div className="mt-4 flex gap-4">
                <button
                    type="button"
                    onClick={handlePreview}
                    className="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Preview
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    {mode === "create" ? "Publish" : "Update"}
                </button>
            </div>

            <PreviewModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                title={title}
                content={editorRef.current?.getContent() || ""}
                currentUser={{
                    name: session?.user?.name || null,
                    email: session?.user?.email || null,
                }}
            />
        </main>
    );
};

export default EditorPage;
