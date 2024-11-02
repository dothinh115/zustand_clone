"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";

export default function Section_3() {
  const [post] = useGlobalState("post", "post 1");

  useEffect(() => {
    console.log("section 3 rerendered");
  });
  return <>Section 3: {post}</>;
}
