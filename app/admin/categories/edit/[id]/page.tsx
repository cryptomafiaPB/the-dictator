import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    redirect("/admin/categories");
  }

  const handleUpdate = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await prisma.category.update({
      where: { id: params.id },
      data: { name, description },
    });

    redirect("/admin/categories");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form action={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={category.name}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={category.description || ""}
            className="w-full p-2 border rounded"
          />
        </div>
        <Button type="submit">Update Category</Button>
      </form>
    </div>
  );
}
