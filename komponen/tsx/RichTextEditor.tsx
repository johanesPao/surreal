'use client'

import '@/app/_css/globals.css'
import { Session } from 'next-auth';
import { effect, Signal, signal } from '@preact-signals/safe-react';
import Image from 'next/image';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Mathematics } from '@tiptap-pro/extension-mathematics';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import { Footnotes, FootnoteReference, Footnote } from 'tiptap-footnotes';
import Highlight from '@tiptap/extension-highlight';
import { Image as TTImage } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline'
import 'katex/dist/katex.min.css';

import { createComment } from '@/app/api/db/comment';
import { InferAccount } from '@/schema';
import { TInsertCommentData } from '@/app/_types/query';
import { IconBold, IconCode, IconFileExport, IconH1, IconH2, IconH3, IconHighlight, IconItalic, IconList, IconStrikethrough, IconSubscript, IconSuperscript, IconSwipeDown, IconUnderline } from '@tabler/icons-react';
import useDesktopOrMobile from '@/app/_lib/_hooks_wrapper/useDesktopOrMobile';

type RichTextEditorProps = {
    userSession: Session['user'],
    artikelId: string,
    content: Signal<string>,
    charCount: Signal<number>,
    wordCount: Signal<number>,
    limit: number
}

const warning = signal<"text-green-500" | "text-orange-500" | "text-red-500">("text-green-500")

const RichTextEditor = ({ userSession, artikelId, content, charCount, wordCount, limit }: RichTextEditorProps) => {
    const [diDesktop] = useDesktopOrMobile();

    effect(() => {
        if (document) {
            const elemEditor = document.getElementById('editor')
            if (elemEditor) {
              elemEditor.addEventListener('contextmenu', (e) => {
                e.preventDefault()
            })
            }
        }
    })

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                document: false
            }),
            Document.extend({
                content: 'block+ footnotes?',
            }),
            Mathematics,
            CharacterCount.configure({
                limit
            }),
            Footnotes,
            Footnote,
            FootnoteReference,
            Highlight,
            Placeholder.configure({
                placeholder: 'Write your comments ...'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Subscript,
            Superscript
        ],
        enableContentCheck: true,

        editorProps: {
            attributes: {
                class: (
                    'h-full focus:outline-none prose dark:prose-invert max-w-none [&_ol]:list-decimal [&_ul]:list-disc'
                ),
            }
        },
        editable: true,
        autofocus: false,
        parseOptions: {
            preserveWhitespace: 'full'
        },
        onUpdate: ({ editor }) => {
            content.value = JSON.stringify(editor.getJSON())
            charCount.value = editor.storage.characterCount.characters()
            wordCount.value = editor.storage.characterCount.words()
        }
    })

    if (!editor) {
        return null
    }

    const handleSubmit = async () => {
        const insertCommentData: TInsertCommentData = {
            provider: userSession.provider as InferAccount['provider'],
            providerId: userSession.id,
            commentData: {
                articleId: artikelId,
            accountId: userSession.id,
            content: editor.getJSON(),
            }
        }

        const insertedComment = await createComment(JSON.stringify(insertCommentData))

        if (insertedComment) {
            editor.commands.clearContent()
        }
    }

    return (
        <div className="flex gap-2 h-full overflow-y-scroll">
        <div className="flex flex-col gap-1 text-[0.8rem] overflow-y-scroll no-scrollbar w-fit px-1">
            <div className={`${editor.isActive('bold') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconBold
                    size={32}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
            </div>
            <div className={`${editor.isActive('italic') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconItalic
                    size={32}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
            </div>
            <div className={`${editor.isActive('strike') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconStrikethrough
                    size={32}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />
            </div>
            <div className={`${editor.isActive('underline') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconUnderline
                    size={32}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
            </div>
            <div className={`${editor.isActive('subscript') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconSubscript
                    size={32}
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                />
            </div>
            <div className={`${editor.isActive('superscript') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconSuperscript
                    size={32}
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                />
            </div>
            <div className={`${editor.isActive('highlight') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconHighlight
                    size={32}
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                />
            </div>
            <div className={`${editor.isActive('code') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                <IconCode
                    size={32}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                />
            </div>
        </div>
        <div className="flex flex-col overflow-y-scroll w-full">
            <div className="font-robotoMono h-full">
                {editor && (
                    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                        <div className="floating-menu flex bg-stone-700 gap-1 rounded-md p-2">
                            <div className={`${editor.isActive('heading', { level: 1 }) ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                                <IconH1
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                />
                            </div>
                            <div className={`${editor.isActive('heading', { level: 2 }) ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                                <IconH2
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                />
                            </div>
                            <div className={`${editor.isActive('heading', { level: 3 }) ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                                <IconH3
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                />
                            </div>
                            <div className={`${editor.isActive('bulletList') ? 'bg-green-700' : 'bg-stone-700'} rounded-md p-1`}>
                                <IconList
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                />
                            </div>
                        </div>
                    </FloatingMenu>
                )}
                <EditorContent editor={editor} className="h-full" id="editor"/>
            </div>
        </div>
        </div>
    )
}

export default RichTextEditor
