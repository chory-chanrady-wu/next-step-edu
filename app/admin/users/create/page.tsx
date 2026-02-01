"use client";

import UserForm from "@/app/components/admin/users/UserForm";

export default function CreateUserPage() {
    return (
        <div className="py-2">
            <UserForm mode="create" />
        </div>
    );
}
