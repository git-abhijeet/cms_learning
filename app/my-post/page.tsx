// File: app/profile/page.tsx

import React from "react";
import PostPage from "@/components/PostPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const userEmail = session.user.email ?? "";

    return <PostPage userEmail={userEmail} />;
};

export default ProfilePage;
