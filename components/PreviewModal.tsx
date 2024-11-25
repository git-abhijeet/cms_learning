// File: components/PreviewModal.tsx

import React from "react";
import PostDetails from "@/components/PostDetails";
import { ImageSlider } from "img_plugin";

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    currentUser: {
        name?: string | null;
        email?: string | null;
    };
}

const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onClose,
    title,
    content,
    currentUser,
}) => {
    if (!isOpen) return null;

    const images = ["a.png", "b.png", "c.png", "d.png"];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* <div>
                    <ImageSlider
                        images={images}
                        autoSlideInterval={2000}
                        width="800px"
                        height="500px"
                        publicPath="/images" // Path to your images folder
                    />
                </div> */}

                <div className="p-6">
                    <PostDetails
                        title={title}
                        authorName={currentUser.name || "Preview Author"}
                        authorEmail={currentUser.email || "preview@example.com"}
                        createdAt={new Date().toISOString()}
                        content={content}
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
