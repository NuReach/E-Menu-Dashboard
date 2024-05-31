import React, { useState, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FaBold, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaStrikethrough, FaUnderline, FaUndo } from "react-icons/fa";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";

interface MenuBarProps {
  editor?: Editor | null;
}


const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar flex flex-wrap gap-3 p-3 min-h-16">
      <div>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().undo().run();
        }}>
          <FaUndo />
        </button>
        <button onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().redo().run();
        }}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Underline,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

interface TiptapProps {
  setDescription: (html: string) => void;
  data: string | null;
}

const Tiptap: React.FC<TiptapProps> = ({ setDescription, data }) => {
  const editor = useEditor({
    extensions,
    content: data  ,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
