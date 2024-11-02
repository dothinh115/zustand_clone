"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";

export default function Section_2() {
  const [count, setCount] = useGlobalState("count");
  const [post, setPost] = useGlobalState("post");
  useEffect(() => {
    console.log("section 2 rerendered");
  });
  const inc = () => {
    setCount(count + 1);
  };
  const changePost = () => {
    setPost(post + " 1");
  };
  return (
    <>
      <div className="space-x-2">
        Section 2 : <button onClick={inc}>count</button>{" "}
        <button onClick={changePost}>post</button>
      </div>
    </>
  );
}
