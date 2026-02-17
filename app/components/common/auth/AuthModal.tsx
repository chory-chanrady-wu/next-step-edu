"use client";

import { useState } from "react";
import ModalBackdrop from "../auth/ModalBackDrop";
import AuthHeader from "./AuthHeader";
import AuthTabs from "../auth/AuthTaps";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Tab = "login" | "register";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("login");

  if (!open) return null;

  const title = tab === "login" ? "Login" : "Registration";
  const subtitle =
    tab === "login" ? (
      <>
        Welcome to back to{" "}
        <span className="font-semibold text-teal-600">NextStepEdu</span>.
      </>
    ) : (
      <>
        Create an account and get start with{" "}
        <span className="font-semibold text-teal-600">NextStepEdu</span>
      </>
    );

  return (
    <div className="fixed inset-0 z-[100] overflow-auto">
      <ModalBackdrop onClose={onClose} />

      <div className="relative z-[101] flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-[520px] overflow-hidden rounded-[28px] bg-white shadow-2xl">
          <AuthHeader title={title} subtitle={subtitle} onClose={onClose} />
          <AuthTabs tab={tab} onChange={setTab} />

          <div className="px-8 pb-10 pt-8">
            {tab === "login" ? (
              <LoginForm
                onSubmit={onClose}
                onSwitch={() => setTab("register")}
              />
            ) : (
              <RegisterForm onSwitch={() => setTab("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
