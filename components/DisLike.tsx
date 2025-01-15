"use client";

import { User } from "@clerk/nextjs/server";
import { ThumbsDownIcon } from "lucide-react";
import { useState } from "react";

export default function DisLike({
  onEvent,
  count,
}: {
  onEvent: (type: "like" | "dislike") => void;
  count: number;
}) {
  const [localCount, setCount] = useState(count);
  const handleEvent = () => {
    onEvent("dislike");
    setCount(localCount + 1);
  };
  return (
    <button
      onClick={() => {
        handleEvent();
      }}
      className={`flex items-center gap-2 cursor-pointer`}
    >
      <ThumbsDownIcon className="h-5 w-5" />
      <span className="text-base font-mono uppercase">{localCount}</span>
    </button>
  );
}
