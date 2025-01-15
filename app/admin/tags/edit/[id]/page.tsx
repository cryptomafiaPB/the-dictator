import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditTagPage({
  params,
}: {
  params: { id: string };
}) {
  const tag = await prisma.tag.findUnique({
    where: { id: params.id },
  });

  if (!tag) {
    redirect("/admin/tags");
  }

  const handleUpdate = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    // const description = formData.get("description") as string;

    await prisma.tag.update({
      where: { id: params.id },
      data: { name },
    });

    redirect("/admin/tags");
  };

  const handleDelete = async (id: string) => {
    "use server";

    await prisma.category.delete({ where: { id } });
    redirect("/admin/categories");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Tag</h1>
      <form action={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={tag.name}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={tag.name || ""}
            className="w-full p-2 border rounded"
          />
        </div> */}
        <Button type="submit">Update Tags</Button>
      </form>
    </div>
  );
}
