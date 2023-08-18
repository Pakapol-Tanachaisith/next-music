import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Next Music | Sign In",
  description: "Sign in to your Next Music account.",
};

export default function Page() {
  return <SignIn />;
}
