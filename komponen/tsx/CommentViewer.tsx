"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import { Footnotes, FootnoteReference, Footnote } from "tiptap-footnotes";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Mathematics from "@tiptap-pro/extension-mathematics";

type CommentViewerProps = {
  content: string;
};

const CommentViewer = ({ content }: CommentViewerProps) => {
  console.log(content);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        document: false,
      }),
      Document.extend({
        content: "block+ footnotes?",
      }),
      Mathematics,
      Footnotes,
      Footnote,
      FootnoteReference,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript,
      Superscript,
    ],
    content: JSON.parse(content),
    editorProps: {
      attributes: {
        class:
          "h-full focus:outline-none prose dark:prose-invert max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
    editable: false,
  });
  return (
    <div className="p-2">
      <EditorContent editor={editor} />
    </div>
  );
};

export default CommentViewer;
