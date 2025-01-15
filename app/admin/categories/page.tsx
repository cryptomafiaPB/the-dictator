/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <Link href="/admin/categories/create">
        <Button>Create New Category</Button>
      </Link>
      <div className="mt-4 space-y-4">
        {categories.map((category: any) => (
          <div key={category.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{category.name}</h2>
            <p>{category.description}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/admin/categories/edit/${category.id}`}>
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
