import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function CreateTagPage() {
  const handleCreate = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    // const description = formData.get("description") as string;

    await prisma.tag.create({
      data: { name },
    });

    redirect("/admin/tags");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Tags</h1>
      <form action={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" className="w-full p-2 border rounded" />
        </div> */}
        <Button type="submit">Create Tag</Button>
      </form>
    </div>
  );
}
