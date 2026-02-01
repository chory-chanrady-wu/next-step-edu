"use client";

import { useState } from "react";
import AuthHeader from "./AuthHeader";
import AuthTabs from "../auth/AuthTaps";
import AuthLoginForm from "../auth/LoginForm";
import AuthRegisterForm from "../auth/RegisterForm";
import ModalBackdrop from "../auth/ModalBackDrop";

type Tab = "login" | "register";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("login");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <ModalBackdrop onClose={onClose} />

      <div className="relative z-[101] flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
          <AuthHeader onClose={onClose} />
          <AuthTabs tab={tab} onChange={setTab} />

          <div className="px-8 pb-10 pt-8">
            {tab === "login" ? (
              <AuthLoginForm onSubmit={() => alert("Login submit")} />
            ) : (
              <AuthRegisterForm onSubmit={() => alert("Register submit")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
