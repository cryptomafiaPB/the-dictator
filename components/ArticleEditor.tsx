/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "./Tiptap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { FaSpinner } from "react-icons/fa";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Article } from "@prisma/client";
import Image from "next/image";

export default function ArticleEditor({
  onSave,
  initialContent,
  categories,
  tags,
}: {
  onSave: (
    content: string,
    title: string,
    categories: string[],
    tags: string[],
    image?: string
  ) => void;
  initialContent?: Article;
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
}) {
  const [title, setTitle] = useState(initialContent?.title || "");
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    initialContent?.categoriesIDs[0] || categories[0].id,
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    initialContent?.tagsIDs[0] || tags[0].id,
  ]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialContent?.image || null
  );

  const formSchema = z.object({
    title: z
      .string()
      // .min(2, { message: "Title is not long enough" })
      .max(100, { message: "Title is too long" }),
    content: z
      .string()
      // .min(2, { message: "Content is not long enough" })
      .max(14000, { message: "Content is too long" }),
    categories: z.string().min(1, { message: "Select at least one category" }),
    tags: z.string().min(1, { message: "Select at least one tag" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    defaultValues: {
      title,
      content: initialContent?.content,
      categories: selectedCategories[0],
      tags: selectedTags[0],
    },
    resolver: zodResolver(formSchema),
  });

  const handleCoverImageUpload = async (file: File) => {
    const storageRef = ref(storage, `cover-images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    values;
  }

  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: initialContent,
  // });

  const handleSave = () => {
    setLoading(true);
    try {
      onSave(
        form.getValues().content,
        title,
        selectedCategories,
        selectedTags,
        imageUrl || undefined
      );
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
          {loading ? (
            <>
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-screen" />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-100"
                        value={title}
                        // defaultValue={initialContent?.title}
                        placeholder="Enter the title of article.."
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-lg" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Description
                    </FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Enter the Description of article.." /> */}
                      <Tiptap
                        description={initialContent?.content || ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormItem className="space-y-4">
            <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight">
              Cover Image
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                className="bg-slate-100"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    handleCoverImageUpload(file);
                  }
                }}
              />
            </FormControl>
            {imageUrl ? (
              <div className="flex items-center justify-center mt-2">
                <Image
                  loading="lazy"
                  src={imageUrl}
                  alt="Cover Preview"
                  width={600}
                  height={400}
                  className="mt-2 rounded"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            ) : null}
          </FormItem>

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Categories
                </FormLabel>
                <Select
                  onValueChange={(value) => setSelectedCategories([value])}
                  // defaultValue={selectedCategories[0]}
                  value={selectedCategories[0]}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-100">
                      <SelectValue
                        className="text-black"
                        placeholder="Select a Category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Tags
                </FormLabel>

                <Select
                  onValueChange={(value) => setSelectedTags([value])}
                  // defaultValue={selectedTags[0]}
                  value={selectedTags[0]}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-100">
                      <SelectValue
                        className="text-black"
                        placeholder="Select a Tag"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tags.map((tag: any) => (
                      <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            // onClick={form.handleSubmit(handleSave)}
            type="submit"
            disabled={loading}
            className={` bg-blue-600 hover:bg-blue-700 ${
              loading ? "w-20 cursor-wait" : ""
            }`}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Save Article"}
          </Button>
        </form>
      </Form>
      {/* <input
        type="text"
        placeholder="Enter article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <EditorContent editor={editor} className="border p-4 rounded" />
      <div>
        <label className="block text-sm font-medium">Categories</label>
        <select
          multiple
          value={selectedCategories}
          onChange={(e) =>
            setSelectedCategories(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full p-2 border rounded"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Tags</label>
        <select
          multiple
          value={selectedTags}
          onChange={(e) =>
            setSelectedTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full p-2 border rounded"
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleSave}>Save Article</Button> */}
    </div>
  );
}
