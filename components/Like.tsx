"use client";

import { ThumbsUpIcon } from "lucide-react";
import { useState } from "react";

export default function Like({
  onEvent,
  count,
}: {
  onEvent: (type: "like" | "dislike") => void;
  count: number;
}) {
  const [localCount, setCount] = useState(count);
  const handleEvent = () => {
    onEvent("like");
    setCount(localCount + 1);
  };
  return (
    <button
      onClick={() => {
        handleEvent();
      }}
      className={`flex items-center gap-2 cursor-pointer`}
    >
      <ThumbsUpIcon className="h-5 w-5" />
      <span className="text-base font-mono uppercase">{localCount}</span>
    </button>
  );
}
