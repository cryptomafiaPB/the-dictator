"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CommentForm({ articleId }: { articleId: string }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, content }),
    });

    if (response.ok) {
      setContent("");
      window.location.reload(); // Refresh the page to show the new comment
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
