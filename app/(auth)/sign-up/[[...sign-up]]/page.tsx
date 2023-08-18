import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Next Music | Sign Up",
  description: "Create new Next Music account.",
};

export default function Page() {
  return <SignUp />;
}
