"use client";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";

export default function TiptapArea({
  editorRef,
}: {
  editorRef: RefObject<Editor | null>;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Désactiver l'historique si besoin
      }),
      TextStyle,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault(); // Bloque l'envoi du formulaire
        }
      },
    },
  });

  if (!editor) return null;

  // On stocke l'instance de l'éditeur dans editorRef
  editorRef.current = editor;

  return (
    <div className="space-y-2 bg-card rounded-md border flex flex-col items-center">
      <div className="flex flex-wrap items-center gap-2 rounded-lg mb-0 py-1">
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </Button>
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          ⬅️
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          ⏺️
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          ➡️
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          •
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </Button>
      </div>
      <EditorContent
        editor={editor}
        onBlur={(e) => e.preventDefault()}
        className="prose bg-card h-48 p-4 border-t rounded-b-md w-full"
      />
    </div>
  );
}
