/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TagsPage() {
  const tags = await prisma.tag.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Tags</h1>
      <Link href="/admin/tags/create">
        <Button>Create New Tags</Button>
      </Link>
      <div className="mt-4 space-y-4">
        {tags.map((tag: any) => (
          <div key={tag.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{tag.name}</h2>
            {/* <p>{tag.description}</p> */}
            <div className="mt-2 space-x-2">
              <Link href={`/admin/tags/edit/${tag.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>

              {/* <form action={() => handleDelete(category.id)}> */}
              <Button variant="destructive">Delete</Button>
              {/* </form> */}
              {/* <Button variant="destructive">Delete</Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
