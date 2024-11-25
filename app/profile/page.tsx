// "use client";
import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }
    return (
        <main className="flex h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
                <div className="mb-4">
                    <Image
                        src={
                            session?.user?.image ||
                            "https://via.placeholder.com/150"
                        }
                        alt="Profile Picture"
                        width={20}
                        height={20}
                        className="w-24 h-24 mx-auto rounded-full shadow-md object-cover"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {session?.user?.name || "Guest User"}
                </h1>
                <p className="text-gray-600 mb-4">
                    {session?.user?.email || "N/A"}
                </p>
            </div>
        </main>
    );
};

export default Profile;
