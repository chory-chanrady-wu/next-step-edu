"use client";

import RegisterForm from "@/app/components/common/auth/RegisterForm";

export default function ClientRegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
      <h1 className="text-2xl text-center mb-5 font-bold text-teal-700">Register</h1>
        <RegisterForm onSwitch={() => {}} />
      </div>
    </div>
  );
}
