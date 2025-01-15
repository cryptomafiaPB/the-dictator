"use client";

import { useRouter } from "next/navigation";

export default function ArticleFilters({
  categories,
  tags,
}: {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
}) {
  const router = useRouter();

  const handleFilter = (type: string, value: string) => {
    router.push(`/articles?${type}=${encodeURIComponent(value)}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Categories</label>
        <select
          onChange={(e) => handleFilter("category", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Tags</label>
        <select
          onChange={(e) => handleFilter("tag", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Tags</option>
          {tags.map((tag: any) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
