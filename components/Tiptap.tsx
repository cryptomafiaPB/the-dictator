"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import {
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  BoldIcon,
  ItalicIcon,
  ImagePlus,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Heading } from "@tiptap/extension-heading";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Strike } from "@tiptap/extension-strike";
import { Blockquote } from "@tiptap/extension-blockquote";
import { BulletList } from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const [showImageInput, setShowImageInput] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Youtube.configure({
        inline: true,
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          level: [2],
        },
      }),
      OrderedList.extend({
        addAttributes() {
          return {
            class: "list-decimal",
          };
        },
      }),
      BulletList.extend({
        addAttributes() {
          return {
            class: "list-disc",
          };
        },
      }),

      Bold.extend({
        addAttributes() {
          return {
            class: "font-bold",
          };
        },
        parseHTML() {
          return [
            {
              tag: "strong",
            },
          ];
        },
      }),
      Italic.extend({
        addAttributes() {
          return {
            class: "italic",
          };
        },
        parseHTML() {
          return [
            {
              tag: "em",
            },
          ];
        },
      }),
      Strike.extend({
        addAttributes() {
          return {
            class: "line-through",
          };
        },
        parseHTML() {
          return [
            {
              tag: "s",
            },
          ];
        },
      }),
      Blockquote.extend({
        addAttributes() {
          return {
            class: "border-l-4 border-black",
          };
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border focus:border-black min-h-[150px] border-input bg-back p-2 md:p-4 lg:p-6 bg-slate-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const handleImageUpload = async (file: File) => {
    const storageRef = ref(storage, `article-images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    editor?.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] md:p-6">
      {/* <Toolbar editor={editor} /> */}
      {editor && (
        <div className="flex items-center gap-2 border rounded-sm w-fit border-input bg-back px-2 py-1 bg-slate-100">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading")}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading2 className="w-4 h-4 " />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="w-4 h-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle>
            {showImageInput && (
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                    setShowImageInput(false);
                  }
                }}
              />
            )}
            <label
              htmlFor="image-input"
              onClick={() => setShowImageInput(true)}
            >
              <ImagePlus className="w-4 h-4 cursor-pointer" />
            </label>
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} className="mt-2" />
    </div>
  );
}
